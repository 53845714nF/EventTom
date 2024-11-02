import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import User, UserType, EmployeeRole, Event, EventCreate, EventPublic, EventsPublic, EventUpdate, Message

router = APIRouter()


@router.get("/", response_model=EventsPublic)
def read_events(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100
) -> Any:
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


@router.post("/", response_model=EventPublic)
def create_event(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    event_in: EventCreate
) -> Any:
    """
    Create new event.
    """
    
    if not (current_user.user_type == UserType.EMPLOYEE) and (current_user.role == EmployeeRole.EVENTCREATOR):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    selected_user = session.get(User, event_in.manager_id)
    print(event_in.manager_id)
    print(selected_user)
    if not (selected_user.role == EmployeeRole.EVENTMANAGER):
        raise HTTPException(status_code=400, detail="The selected user is not an event manager.")
    
    event = Event.model_validate(event_in)
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
    if not (current_user.role == EmployeeRole.EVENTMANAGER) and (event.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
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
    if not (current_user.role == EmployeeRole.EVENTMANAGER) and (event.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(event)
    session.commit()
    return Message(message="Event deleted successfully")
