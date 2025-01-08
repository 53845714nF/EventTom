from datetime import datetime
from enum import Enum
from uuid import UUID, uuid4

from pydantic import EmailStr
from sqlmodel import Field, SQLModel, func

# User Models


class Role(str, Enum):
    EVENTCREATOR = "eventcreator"
    EVENTMANAGER = "eventmanager"
    ADMIN = "admin"
    CUSTOMER = "customer"


class UserBase(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    balance: float = Field(default=0.0)
    is_active: bool = Field(default=True)
    role: Role = Field()


class User(UserBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    hashed_password: str = Field()


class UserPublic(UserBase):
    id: UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


class UserCreate(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    role: Role | None = Field(default=None)


class UserUpdate(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)
    password: str | None = Field(default=None, min_length=8, max_length=40)
    role: Role | None = Field(default=None)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


class TopUpRequest(SQLModel):
    amount: float


# Event Models


class EventBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=1024)
    threshold: int
    base_price: float
    pay_fee: float
    total_tickets: int = Field(default=0)
    sold_tickets: int = Field(default=0)


class EventCreate(EventBase):
    manager_id: UUID = Field(foreign_key="user.id")


class EventUpdate(EventBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore
    manager_id: UUID | None = Field(default=None)


class Event(EventBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    manager_id: UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    creator_id: UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")


class EventPublic(EventBase):
    id: UUID
    title: str
    description: str | None
    base_price: float
    pay_fee: float
    total_tickets: int
    sold_tickets: int


class EventsPublic(SQLModel):
    data: list[EventPublic]
    count: int


# Ticket Models


class Ticket(SQLModel, table=True):
    ticket_id: UUID = Field(default_factory=uuid4, primary_key=True)
    event_id: UUID = Field(foreign_key="event.id", nullable=False, ondelete="CASCADE")
    user_id: UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    quantity: int = Field(default=1)
    purchase_date: datetime = Field(default=func.now())


class TicketWithEvent(SQLModel):
    ticket_id: UUID
    event_id: UUID
    event_title: str
    event_description: str
    user_id: UUID
    quantity: int
    purchase_date: datetime


class TicketPurchaseRequest(SQLModel):
    event_id: UUID
    quantity: int
    voucher_id: str | None = None


class TicketPurchaseResponse(SQLModel):
    user: UserPublic
    event: EventPublic
    quantity: int
    purchase_date: datetime


# Voucher Models


class VoucherBase(SQLModel):
    amount: float = Field()
    title: str = Field(min_length=1, max_length=255)


class Voucher(VoucherBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    owner_id: UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")


class VoucherCreate(VoucherBase):
    owner_id: UUID


class VoucherUpdate(VoucherBase):
    owner_id: UUID


class VoucherPublic(VoucherBase):
    id: UUID
    owner_id: UUID


class VouchersPublic(SQLModel):
    data: list[VoucherPublic]
    count: int


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
