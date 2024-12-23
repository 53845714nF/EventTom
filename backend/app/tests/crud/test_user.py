from fastapi.encoders import jsonable_encoder
from sqlmodel import Session

from app import crud
from app.core.security import verify_password
from app.models import EmployeeCreate, Role, User, UserCreate, UserUpdate
from app.tests.utils.utils import random_email, random_lower_string


def test_create_customer(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_customer(session=db, user_create=user_in)
    assert user.email == email
    assert hasattr(user, "hashed_password")


def test_crate_employee(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    role = Role.EVENTMANAGER
    user_in = EmployeeCreate(email=email, password=password, role=role)
    user = crud.create_employee(session=db, user_create=user_in)
    assert user.email == email
    assert hasattr(user, "hashed_password")


def test_authenticate_customer(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_customer(session=db, user_create=user_in)
    authenticated_user = crud.authenticate(session=db, email=email, password=password)
    assert authenticated_user
    assert user.email == authenticated_user.email


def test_authenticate_employee(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    role = Role.EVENTMANAGER
    user_in = EmployeeCreate(email=email, password=password, role=role)
    user = crud.create_employee(session=db, user_create=user_in)
    authenticated_user = crud.authenticate(session=db, email=email, password=password)
    assert authenticated_user
    assert user.email == authenticated_user.email


def test_not_authenticate_user(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user = crud.authenticate(session=db, email=email, password=password)
    assert user is None


def test_check_if_customer_is_active(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_customer(session=db, user_create=user_in)
    assert user.is_active is True


def test_check_if_customer_is_active_inactive(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password, disabled=True)
    user = crud.create_customer(session=db, user_create=user_in)
    assert user.is_active


def test_check_if_employee_is_admin(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    role = Role.ADMIN
    user_in = EmployeeCreate(email=email, password=password, role=role)
    user = crud.create_employee(session=db, user_create=user_in)
    assert user.role is Role.ADMIN


def test_check_if_employee_is_not_admin(db: Session) -> None:
    username = random_email()
    password = random_lower_string()
    role = Role.EVENTMANAGER
    user_in = EmployeeCreate(email=username, password=password, role=role)
    user = crud.create_employee(session=db, user_create=user_in)
    assert user.role is not Role.ADMIN


def test_get_customer(db: Session) -> None:
    password = random_lower_string()
    username = random_email()
    user_in = UserCreate(email=username, password=password)
    user = crud.create_customer(session=db, user_create=user_in)
    user_2 = db.get(User, user.id)
    assert user_2
    assert user.email == user_2.email
    assert jsonable_encoder(user) == jsonable_encoder(user_2)


def test_update_customer(db: Session) -> None:
    password = random_lower_string()
    email = random_email()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_customer(session=db, user_create=user_in)
    new_password = random_lower_string()
    user_in_update = UserUpdate(password=new_password)
    if user.id is not None:
        crud.update_user(session=db, db_user=user, user_in=user_in_update)
    user_2 = db.get(User, user.id)
    assert user_2
    assert user.email == user_2.email
    assert verify_password(new_password, user_2.hashed_password)
