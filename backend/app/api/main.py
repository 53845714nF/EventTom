from fastapi import APIRouter

from app.api import websockets
from app.api.routes import events, login, tickets, users, utils, vouchers

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(vouchers.router, prefix="/vouchers", tags=["vouchers"])
api_router.include_router(tickets.router, prefix="/tickets", tags=["vouchers"])
api_router.include_router(websockets.router, tags=["websockets"])
