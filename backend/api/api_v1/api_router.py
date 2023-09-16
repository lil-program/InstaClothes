from fastapi import APIRouter

from api.api_v1.endpoints import users, closets

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(closets.router, prefix="/closets", tags=["closets"])