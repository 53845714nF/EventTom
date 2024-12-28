import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep, get_current_active_employee
from app.models import (
    Message,
    User,
    UserType,
    Voucher,
    VoucherCreate,
    VoucherPublic,
    VouchersPublic,
    VoucherUpdate,
)

router = APIRouter()


@router.get(
    "/me",
    response_model=VouchersPublic,
)
def read_my_vouchers(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> VouchersPublic:
    """
    Get vouchers for the current user.
    """
    count_statement = (
        select(func.count())
        .select_from(Voucher)
        .where(Voucher.owner_id == current_user.id)
    )
    count = session.exec(count_statement).one()

    statement = (
        select(Voucher)
        .where(Voucher.owner_id == current_user.id)
        .offset(skip)
        .limit(limit)
    )
    vouchers = session.exec(statement).all()

    if not vouchers:
        raise HTTPException(
            status_code=404, detail="No vouchers found for the current user"
        )

    return VouchersPublic(data=vouchers, count=count)


@router.post(
    "/",
    dependencies=[Depends(get_current_active_employee)],
    response_model=VoucherPublic,
)
def create_voucher(*, session: SessionDep, voucher_in: VoucherCreate) -> Any:
    """
    Create new voucher.
    """

    # Get the customer who is intended for the voucher
    selected_user = session.get(User, voucher_in.owner_id)

    if selected_user is None:
        raise HTTPException(
            status_code=400, detail="The selected customer dose not exsit."
        )

    if selected_user.user_type != UserType.CUSTOMER:
        raise HTTPException(
            status_code=400,
            detail=f"The selected user is not an customer. User: {selected_user.email}",
        )

    voucher = Voucher.model_validate(voucher_in)
    session.add(voucher)
    session.commit()
    session.refresh(voucher)
    return voucher


@router.get(
    "/{id}",
    dependencies=[Depends(get_current_active_employee)],
    response_model=VoucherPublic,
)
def read_voucher(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get voucher by ID.
    """
    voucher = session.get(Voucher, id)
    if not voucher:
        raise HTTPException(status_code=404, detail="Event not found")

    return voucher


@router.put(
    "/{id}",
    dependencies=[Depends(get_current_active_employee)],
    response_model=VoucherPublic,
)
def update_voucher(
    *,
    session: SessionDep,
    id: uuid.UUID,
    voucher_in: VoucherUpdate,
) -> Any:
    """
    Update an voucher.
    """
    voucher = session.get(Voucher, id)

    if not voucher:
        raise HTTPException(status_code=404, detail="Event not found")

    update_dict = voucher_in.model_dump(exclude_unset=True)
    voucher.sqlmodel_update(update_dict)
    session.add(voucher)
    session.commit()
    session.refresh(voucher)
    return voucher


@router.delete("/{id}", dependencies=[Depends(get_current_active_employee)])
def delete_voucher(session: SessionDep, id: uuid.UUID) -> Message:
    """
    Delete an voucher.
    """
    voucher = session.get(Voucher, id)
    if not voucher:
        raise HTTPException(status_code=404, detail="Voucher not found")

    session.delete(voucher)
    session.commit()
    return Message(message="Event deleted successfully")


@router.get(
    "/user/{user_id}",
    dependencies=[Depends(get_current_active_employee)],
    response_model=VouchersPublic,
)
def read_voucher_by_user(
    session: SessionDep, user_id: uuid.UUID, skip: int = 0, limit: int = 100
) -> Any:
    """
    Get voucher by user.
    """
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
