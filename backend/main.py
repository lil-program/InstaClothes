from api.api_v1.api_router import api_router
from core.config import settings
from fastapi import FastAPI

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)


app.include_router(api_router, prefix=settings.API_V1_STR)
