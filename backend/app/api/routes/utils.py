from fastapi import APIRouter, HTTPException
from pydantic.networks import EmailStr

from app.api.deps import CurrentUser
from app.models import Message, Role
from app.utils import generate_test_email, send_email

router = APIRouter()


@router.post(
    "/test-email/",
    status_code=201,
)
def test_email(email_to: EmailStr, current_user: CurrentUser) -> Message:
    """
    Test emails.
    """

    if current_user.role == Role.CUSTOMER:
        raise HTTPException(
            status_code=403, detail="Current user does not have enough privileges"
        )

    email_data = generate_test_email(email_to=email_to)
    send_email(
        email_to=email_to,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Test email sent")


@router.get("/health-check/")
async def health_check() -> bool:
    return True
