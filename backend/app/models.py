import uuid

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel, ForeignKey
from datetime import datetime

from enum import Enum
from typing import Optional

#
# Users
#
class UserType(str, Enum):
    EMPLOYEE = "employee"
    CUSTOMER = "customer"


class EmployeeRole(str, Enum):
    EVENTCREATOR = "eventcreator"
    EVENTMANAGER = "eventmanager"


class UserBase(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    user_type: UserType = Field(..., description="Type of user, either customer or employee.")
    role: Optional[EmployeeRole] = Field(default=None, description="Role of employee, if user is an employee")


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    vouchers: list["Voucher"] = Relationship(back_populates="owner", cascade_delete=True)
    managed_events: list["Event"] = Relationship(back_populates="manager")

# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


#
# Events
#
class EventBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)
    count: int
    base_price: float
    pay_fee: float

# Properties to receive on event creation
class EventCreate(EventBase):
    manager_id: uuid.UUID


# Properties to receive on event update
class EventUpdate(EventBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore
    manager_id: uuid.UUID


class Event(EventBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(max_length=255)
    
    manager_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    manager: User | None = Relationship(back_populates="managed_events")


class EventCustomer(SQLModel):
    event_id: uuid.UUID = Field(ForeignKey("event.id"), primary_key=True)
    customer_id: uuid.UUID = Field(ForeignKey("user.id"), primary_key=True)
    
    join_date: datetime = Field(default=datetime.now)
    status: str = Field(default="active", max_length=50)

    event = Relationship(back_populates="event_customers")
    customer: User = Relationship(back_populates="customer_events")


class EventPublic(EventBase):
    id: uuid.UUID
    title: str
    description: str | None
    count: int
    base_price: float
    pay_fee: float


class EventsPublic(SQLModel):
    data: list[EventPublic]
    count: int

#
# Voucher 
#
class VoucherBase(SQLModel):
    amount: float


class VoucherCreate(VoucherBase):
    owner_id: uuid.UUID


class VoucherUpdate(EventBase):
    amount: float


class Voucher(VoucherBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="vouchers")
    amount: float


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)
