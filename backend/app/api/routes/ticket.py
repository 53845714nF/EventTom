from uuid import UUID

from fastapi import APIRouter, HTTPException
from app.api.deps import CurrentUser, SessionDep
from app.models import Event, EventPublic, Ticket
from sqlmodel import select

router = APIRouter()


@router.post("/{id}/buy", response_model=EventPublic)
def buy_ticket(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    event_id: UUID,
) -> EventPublic:
    event = session.get(Event, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    if event.sold_tickets >= event.total_tickets:
        raise HTTPException(status_code=400, detail="Not enough tickets available")

    event.sold_tickets += 1
    ticket = Ticket(event_id=event_id, user_id=current_user.id)
    session.add(ticket)
    session.commit()
    session.refresh(event)
    return event


@router.get("/my-tickets", response_model=list[Ticket])
def list_my_tickets(*, session: SessionDep, current_user: CurrentUser) -> list[Ticket]:
    tickets = session.exec(
        select(Ticket).where(Ticket.user_id == current_user.id)
    ).all()
    return tickets
