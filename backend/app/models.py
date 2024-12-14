from uuid import UUID, uuid4
from pydantic import EmailStr
from sqlmodel import SQLModel, Field, Relationship
from enum import Enum
from typing import Optional, List

#
# User Models
#
class UserType(str, Enum):
    EMPLOYEE = "employee"
    CUSTOMER = "customer"

class EmployeeRole(str, Enum):
    EVENTCREATOR = "eventcreator"
    EVENTMANAGER = "eventmanager"
    ADMIN = "admin"

class UserBase(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    user_type: UserType

class User(UserBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    hashed_password: str
    
    # Discriminator column für den Benutzertyp
    user_type: UserType = Field(default=None)
    
    # Employee specific fields
    role: Optional[EmployeeRole] = Field(default=None)

    # Customer specific fields
    vouchers: Optional[List["Voucher"]] = Relationship(
        back_populates="owner",
        sa_relationship_kwargs={"primaryjoin": "and_(User.id==Voucher.owner_id, User.user_type=='customer')"}
    )

class UserCreate(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    password: str = Field(min_length=8, max_length=40)

class EmployeeCreate(UserCreate):
    user_type: UserType = UserType.EMPLOYEE
    role: Optional[EmployeeRole] = Field(default=None)

class CustomerCreate(UserCreate):
    user_type: UserType = UserType.CUSTOMER

class UserUpdate(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)
    password: str | None = Field(default=None, min_length=8, max_length=40)
    user_type: UserType = Field(default=None)
    role: Optional[EmployeeRole] | None = Field(default=None)

class UserPublic(UserBase):
    id: UUID

class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int

class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


#
# Event Models 
#
class EventBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)
    count: int
    threshold: int
    base_price: float
    pay_fee: float

# Properties to receive on event creation
class EventCreate(EventBase):
    manager_id: UUID


# Properties to receive on event update
class EventUpdate(EventBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore
    manager_id: UUID | None = Field(default=None)


class Event(EventBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    manager_id:UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")


# Singel Event must be Public
class EventPublic(EventBase):
    id: UUID
    title: str
    description: str | None
    count: int
    base_price: float
    pay_fee: float


class EventsPublic(SQLModel):
    data: list[EventPublic]
    count: int

#
# Voucher Models
#
class VoucherBase(SQLModel):
    amount: float


class VoucherCreate(VoucherBase):
    owner_id: UUID


class VoucherUpdate(EventBase):
    amount: float


class Voucher(VoucherBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    owner_id: UUID = Field(
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
