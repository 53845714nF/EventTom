from collections.abc import Sequence
from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from sqlmodel import select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.api.websockets import manager
from app.models import Event, EventPublic, Role, Ticket, TicketPurchaseResponse, Voucher

router = APIRouter()


@router.get("/my-tickets", response_model=Sequence[Ticket])
def list_my_tickets(
    *, session: SessionDep, current_user: CurrentUser
) -> Sequence[Ticket]:
    """
    List all tickets purchased by the current user.
    """

    tickets = session.exec(
        select(Ticket).where(Ticket.user_id == current_user.id)
    ).all()
    return tickets


@router.get("/activities", response_model=Sequence[TicketPurchaseResponse])
def read_manager_ticket_purchases(
    session: SessionDep, current_user: CurrentUser, limit: int = 10
) -> Sequence[TicketPurchaseResponse]:
    """
    Get the last X ticket purchases.
    """

    if current_user.role != Role.EVENTMANAGER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only event managers can access ticket purchases",
        )

    results = crud.get_manager_ticket_purchases(session, current_user.id, limit)

    ticket_purchases = [
        TicketPurchaseResponse(
            ticket_id=ticket.ticket_id,
            event_id=event.id,
            event_title=event.title,
            user_id=user.id,
            user_email=user.email,
            quantity=ticket.quantity,
            purchase_date=ticket.purchase_date,
        )
        for ticket, event, user in results
    ]

    return ticket_purchases


@router.post("/{id}/buy", response_model=EventPublic)
async def buy_ticket(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    event_id: UUID,
    quantity: int = 1,
    voucher_id: UUID | None = None,
) -> Event:
    """
    Buy tickets for an event.
    """

    event = session.get(Event, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    if event.sold_tickets + quantity > event.total_tickets:
        raise HTTPException(status_code=400, detail="Not enough tickets available")

    final_price_per_ticket = event.base_price + event.pay_fee
    total_cost = final_price_per_ticket * quantity

    if voucher_id:
        voucher = session.get(Voucher, voucher_id)
        if not voucher:
            raise HTTPException(status_code=404, detail="Voucher not found")
        if voucher.owner_id != current_user.id:
            raise HTTPException(status_code=403, detail="You do not own this voucher")
        total_cost -= voucher.amount

    if current_user.balance < total_cost:
        raise HTTPException(status_code=400, detail="Insufficient balance")

    current_user.balance -= total_cost
    event.sold_tickets += quantity
    ticket = Ticket(event_id=event_id, user_id=current_user.id, quantity=quantity)
    session.add(ticket)
    if voucher_id:
        session.delete(voucher)
    session.commit()
    session.refresh(event)
    await manager.broadcast(
        {"type": "ticket_purchase", "quantity": quantity, "event": event.model_dump()}
    )
    return event
