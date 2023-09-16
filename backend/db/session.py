from core.config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

if settings.SQLALCHEMY_DATABASE_URI:
    print(settings.SQLALCHEMY_DATABASE_URI)
    engine = create_engine(
        settings.SQLALCHEMY_DATABASE_URI,
        pool_pre_ping=True,
    )
    SessionLocal = scoped_session(
        sessionmaker(autocommit=False, autoflush=False, bind=engine)
    )
else:
    raise ValueError("SQLALCHEMY_DATABASE_URI is not set")
