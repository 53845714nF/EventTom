from collections.abc import Sequence
from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.api.websockets import manager
from app.models import (
    Event,
    Role,
    Ticket,
    TicketPurchaseRequest,
    TicketPurchaseResponse,
    TicketWithEvent,
    Voucher,
)

router = APIRouter()


@router.get("/my-tickets", response_model=Sequence[TicketWithEvent])
def list_my_tickets(
    *, session: SessionDep, current_user: CurrentUser
) -> Sequence[TicketWithEvent]:
    """
    List all tickets purchased by the current user, including event information.
    """

    results = crud.get_tickets_with_events(session, current_user.id)

    tickets_with_events = [
        TicketWithEvent(
            ticket_id=ticket.ticket_id,
            event_id=event.id,
            event_title=event.title,
            event_description=event.description,
            user_id=ticket.user_id,
            quantity=ticket.quantity,
            purchase_date=ticket.purchase_date,
        )
        for ticket, event in results
    ]

    return tickets_with_events


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


@router.post("/buy", response_model=TicketPurchaseResponse)
async def buy_ticket(
    *, session: SessionDep, current_user: CurrentUser, request: TicketPurchaseRequest
) -> TicketPurchaseResponse:
    """
    Buy tickets for an event.
    """

    if current_user.role != Role.CUSTOMER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only customers can buy tickets",
        )

    voucher = None
    if request.voucher_id:
        try:
            voucher_id = UUID(request.voucher_id)
        except ValueError:
            raise HTTPException(
                status_code=400, detail="Voucher ID is not a valid UUID"
            )
        voucher = session.get(Voucher, voucher_id)
        if not voucher:
            raise HTTPException(status_code=404, detail="Voucher not found")
        if voucher.owner_id != current_user.id:
            raise HTTPException(status_code=403, detail="You do not own this voucher")

    event = session.get(Event, request.event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    if event.sold_tickets + request.quantity > event.total_tickets:
        raise HTTPException(status_code=400, detail="Not enough tickets available")

    final_price_per_ticket = event.base_price * event.pay_fee
    total_cost = final_price_per_ticket * request.quantity

    if voucher:
        total_cost -= voucher.amount

    minimum_cost = request.quantity * event.base_price
    if total_cost < minimum_cost:
        total_cost = minimum_cost

    if current_user.balance < total_cost:
        raise HTTPException(status_code=400, detail="Insufficient balance")

    current_user.balance -= total_cost
    event.sold_tickets += request.quantity
    ticket = Ticket(
        event_id=request.event_id, user_id=current_user.id, quantity=request.quantity
    )
    session.add(ticket)
    if voucher:
        session.delete(voucher)
    session.commit()
    session.refresh(event)
    await manager.broadcast(
        {
            "type": "ticket_purchase",
            "quantity": request.quantity,
            "event": event.model_dump(mode="json"),
        }
    )
    return TicketPurchaseResponse(
        user=current_user, event=event, quantity=request.quantity
    )
