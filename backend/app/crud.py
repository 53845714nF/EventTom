import uuid
from collections.abc import Sequence
from typing import Any

from sqlmodel import Session, desc, select

from app.core.security import get_password_hash, verify_password
from app.models import (
    Event,
    EventCreate,
    Ticket,
    User,
    UserCreate,
    UserUpdate,
)


def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create,
        update={
            "hashed_password": get_password_hash(user_create.password),
        },
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def create_event(
    *, session: Session, event_in: EventCreate, manager_id: uuid.UUID
) -> Event:
    db_event = Event.model_validate(event_in, update={"manager_id": manager_id})
    session.add(db_event)
    session.commit()
    session.refresh(db_event)
    return db_event


def get_tickets_with_events(
    session: Session, user_id: uuid.UUID
) -> Sequence[tuple[Ticket, Event]]:
    statement = (
        select(Ticket, Event)
        .join(Event, Ticket.event_id == Event.id)  # type: ignore[arg-type]
        .where(Ticket.user_id == user_id)
    )
    return session.exec(statement).all()


def get_manager_ticket_purchases(
    session: Session, manager_id: uuid.UUID, limit: int
) -> Sequence[tuple[Ticket, Event, User]]:
    statement = (
        select(Ticket, Event, User)
        .join(Event, Ticket.event_id == Event.id)  # type: ignore[arg-type]
        .join(User, Ticket.user_id == User.id)  # type: ignore[arg-type]
        .where(Event.manager_id == manager_id)
        .order_by(desc(Ticket.purchase_date))
        .limit(limit)
    )
    return session.exec(statement).all()
