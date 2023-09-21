import os

import pytest  # noqa: E402
import sqlalchemy  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402
from sqlalchemy.orm import Session, sessionmaker  # noqa: E402

from app.api import deps  # noqa: E402
from app.db.base import Base  # noqa: E402
from app.main import app  # noqa: E402
from app.tests.utils import utils  # noqa: E402

# DBのURL要素を環境変数から取得する
DB_HOST = os.environ.get("POSTGRES_SERVER")
DB_PORT = os.environ.get("POSTGRES_PORT")
TEST_DB_NAME = os.environ.get("POSTGRES_TEST_DB")
DB_USER = os.environ.get("POSTGRES_USER")
DB_PASSWORD = os.environ.get("POSTGRES_PASSWORD")

# DBのURLを作成する
if DB_HOST and DB_PORT and TEST_DB_NAME and DB_USER and DB_PASSWORD:
    SQLALCHEMY_DATABASE_URL = (
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{TEST_DB_NAME}"
    )
    print(SQLALCHEMY_DATABASE_URL)
else:
    raise ValueError(
        "POSTGRES_SERVER, POSTGRES_PORT, POSTGERS_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD must be set in environment variables."
    )

# テスト用DB接続エンジンを作成
test_engine = sqlalchemy.create_engine(url=SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="function", autouse=True)
def db() -> Session:
    """テスト用のDBセッションを作成する

    Yields:
        Session: sqlalchemyのSessionオブジェクト

    """
    try:
        db = TestingSessionLocal()
        Base.metadata.drop_all(bind=test_engine)
        Base.metadata.create_all(bind=test_engine)
        yield db
    finally:
        db.close()


@pytest.fixture(scope="function", autouse=True)
def client(db: Session) -> TestClient:
    """テスト用のFastAPIクライアントを返す

    Yields:
        Iterator[TestClient]: テスト用のFastAPIクライアント

    """
    app.dependency_overrides[deps.get_db] = lambda: db
    with TestClient(app) as client:
        yield client


@pytest.fixture(scope="function", autouse=True)
def tester1_token_header() -> dict:
    """テスト用のユーザー1のIDトークンを取得する

    Returns:
        dict: テスト用のユーザー1のIDトークンを含むヘッダー

    """
    return utils.generate_tester1_token_header()
