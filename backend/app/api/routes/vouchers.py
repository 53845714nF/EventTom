import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import (
    Message,
    Role,
    User,
    Voucher,
    VoucherCreate,
    VoucherPublic,
    VouchersPublic,
    VoucherUpdate,
)

router = APIRouter()


@router.post(
    "/",
    response_model=VoucherPublic,
)
def create_voucher(*, session: SessionDep, current_user: CurrentUser, voucher_in: VoucherCreate) -> Any:
    """
    Create new voucher.
    """

    if current_user.role == Role.CUSTOMER:
        raise HTTPException(
            status_code=400, detail="Customers are not allowed to create vouchers."
        )

    # Get the customer who is intended for the voucher
    selected_user = session.get(User, voucher_in.owner_id)

    if selected_user is None:
        raise HTTPException(
            status_code=400, detail="The selected customer does not exist."
        )

    if selected_user.role != Role.CUSTOMER:
        raise HTTPException(
            status_code=400,
            detail=f"The selected user is not a customer. User: {selected_user.email}",
        )

    voucher = Voucher.model_validate(voucher_in)
    session.add(voucher)
    session.commit()
    session.refresh(voucher)
    return voucher


@router.get(
    "/{id}",
    response_model=VoucherPublic,
)
def read_voucher(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get voucher by ID.
    """

    if current_user.role == Role.CUSTOMER:
        raise HTTPException(
            status_code=400, detail="Customers are not allowed to view vouchers."
        )

    voucher = session.get(Voucher, id)
    if not voucher:
        raise HTTPException(status_code=404, detail="Event not found")

    return voucher


@router.put(
    "/{id}",
    response_model=VoucherPublic,
)
def update_voucher(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    voucher_in: VoucherUpdate,
) -> Any:
    """
    Update an voucher.
    """

    if current_user.role == Role.CUSTOMER:
        raise HTTPException(
            status_code=400, detail="Customers are not allowed to update vouchers."
        )

    voucher = session.get(Voucher, id)

    if not voucher:
        raise HTTPException(status_code=404, detail="Event not found")

    update_dict = voucher_in.model_dump(exclude_unset=True)
    voucher.sqlmodel_update(update_dict)
    session.add(voucher)
    session.commit()
    session.refresh(voucher)
    return voucher


@router.delete("/{id}")
def delete_voucher(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Message:
    """
    Delete an voucher.
    """

    if current_user.role == Role.CUSTOMER:
        raise HTTPException(
            status_code=400, detail="Customers are not allowed to delete vouchers."
        )

    voucher = session.get(Voucher, id)
    if not voucher:
        raise HTTPException(status_code=404, detail="Voucher not found")

    session.delete(voucher)
    session.commit()
    return Message(message="Event deleted successfully")


@router.get(
    "/user/{user_id}",
    response_model=VouchersPublic,
)
def read_voucher_by_user(
    session: SessionDep, current_user: CurrentUser, user_id: uuid.UUID, skip: int = 0, limit: int = 100
) -> Any:
    """
    Get voucher by user.
    """

    if current_user.role == Role.CUSTOMER:
        raise HTTPException(
            status_code=400, detail="Customers are not allowed to view vouchers."
        )

    count_statement = (
        select(func.count()).select_from(Voucher).where(Voucher.owner_id == user_id)
    )
    count = session.exec(count_statement).one()

    statement = (
        select(Voucher).where(Voucher.owner_id == user_id).offset(skip).limit(limit)
    )
    vouchers = session.exec(statement).all()

    if not vouchers:
        raise HTTPException(
            status_code=404, detail=f"No vouchers found for user {user_id}"
        )

    return VouchersPublic(data=vouchers, count=count)
