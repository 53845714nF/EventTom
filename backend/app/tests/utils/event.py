from sqlmodel import Session

from app import crud
from app.models import Event, EventCreate
from app.tests.utils.user import create_random_customer
from app.tests.utils.utils import random_lower_string


def create_random_event(db: Session) -> Event:
    user = create_random_customer(db)
    manager_id = user.id
    assert manager_id is not None

    title = random_lower_string()
    description = random_lower_string()
    count = 40000
    threshold = 3
    base_price = 1337
    pay_fee = 5
    event_in = EventCreate(
        title=title,
        description=description,
        count=count,
        threshold=threshold,
        base_price=base_price,
        pay_fee=pay_fee,
    )
    return crud.create_event(session=db, event_in=event_in, manager_id=manager_id)
