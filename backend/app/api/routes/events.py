import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import (
    Event,
    EventCreate,
    EventPublic,
    EventsPublic,
    EventUpdate,
    Message,
    Role,
    User,
)

router = APIRouter()


@router.get("/", response_model=EventsPublic)
def read_events(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Get all Events
    """

    count_statement = select(func.count()).select_from(Event)
    count = session.exec(count_statement).one()
    statement = select(Event).offset(skip).limit(limit)
    events = session.exec(statement).all()

    return EventsPublic(data=events, count=count)


@router.get("/{id}", response_model=EventPublic)
def read_event(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get event by ID.
    """
    event = session.get(Event, id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    return event


@router.get("/manager/{manager_id}", response_model=EventsPublic)
def read_event_by_manager(
    session: SessionDep, manager_id: uuid.UUID, skip: int = 0, limit: int = 100
) -> Any:
    """
    Get events by manager.
    """
    count_statement = (
        select(func.count()).select_from(Event).where(Event.manager_id == manager_id)
    )
    count = session.exec(count_statement).one()

    statement = (
        select(Event).where(Event.manager_id == manager_id).offset(skip).limit(limit)
    )
    events = session.exec(statement).all()

    if not events:
        raise HTTPException(
            status_code=404, detail=f"No events found for manager {manager_id}"
        )

    return EventsPublic(data=events, count=count)


@router.get("/creator/{creator_id}", response_model=EventsPublic)
def read_event_by_creator(
    session: SessionDep, creator_id: uuid.UUID, skip: int = 0, limit: int = 100
) -> Any:
    """
    Get events by creator.
    """
    count_statement = (
        select(func.count()).select_from(Event).where(Event.creator_id == creator_id)
    )
    count = session.exec(count_statement).one()

    statement = (
        select(Event).where(Event.creator_id == creator_id).offset(skip).limit(limit)
    )
    events = session.exec(statement).all()

    if not events:
        raise HTTPException(
            status_code=404, detail=f"No events found for manager {creator_id}"
        )

    return EventsPublic(data=events, count=count)


@router.post("/", response_model=EventPublic)
def create_event(
    *, session: SessionDep, current_user: CurrentUser, event_in: EventCreate
) -> Any:
    """
    Create new event.
    """

    if current_user.role == Role.EVENTCREATOR:
        raise HTTPException(
            status_code=400, detail="Not enough permissions to create events"
        )

    # Get the Event Manger event is intended.
    selected_user = session.get(User, event_in.manager_id)

    if selected_user is None:
        raise HTTPException(
            status_code=400, detail="The selected Event Manager dose not exsit."
        )

    if not (selected_user.role == Role.EVENTMANAGER):
        raise HTTPException(
            status_code=400, detail="The selected user is not an event manager."
        )

    event = Event.model_validate(event_in, update={"creator_id": current_user.id})
    session.add(event)
    session.commit()
    session.refresh(event)
    return event


@router.put("/{id}", response_model=EventPublic)
def update_event(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    event_in: EventUpdate,
) -> Any:
    """
    Update an event.
    """
    event = session.get(Event, id)

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    if not (current_user.id == event.manager_id) or (
        current_user.id == event.creator_id
    ):
        raise HTTPException(
            status_code=400,
            detail="Only the Event Manager or Creator of this Event has enough permissions",
        )

    update_dict = event_in.model_dump(exclude_unset=True)
    event.sqlmodel_update(update_dict)
    session.add(event)
    session.commit()
    session.refresh(event)
    return event


@router.delete("/{id}")
def delete_event(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an event.
    """
    event = session.get(Event, id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    if not (current_user.id == event.manager_id) or (
        current_user.id == event.creator_id
    ):
        raise HTTPException(
            status_code=400,
            detail="Only the Event Manager or Creator of this Event has enough permissions",
        )
    session.delete(event)
    session.commit()
    return Message(message="Event deleted successfully")
