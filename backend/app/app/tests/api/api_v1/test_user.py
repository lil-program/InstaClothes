import os
from typing import Dict

from dotenv import load_dotenv
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import models, schemas
from app.core.config import settings
from app.tests.utils.users import create_user

# 環境変数を読み込む
load_dotenv(override=True)


class TestUser:
    def test_create_user_should_return_user_object_when_all_parameters_are_valid(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """ユーザーを作成するテスト"""
        create_user_shema = schemas.UserCreate(name="tester1")

        response = client.post(
            f"{settings.API_V1_STR}/users/create",
            json=create_user_shema.model_dump(),
            headers=tester1_token_header,
        )

        assert response.status_code == 200

        resp = response.json()

        assert resp["name"] == "tester1"
        assert resp["id"] == os.environ.get("TESTER1_UID")

        # closetが作成されているか確認
        assert (
            db.query(models.Closet)
            .filter(models.Closet.user_id == os.environ.get("TESTER1_UID"))
            .first()
        )

    def test_create_user_should_raise_401_when_uid_is_missing(
        self, db: Session, client: TestClient
    ) -> None:
        """ユーザーを作成したときにuidがない場合401を返すテスト"""
        create_user_shema = schemas.UserCreate(name="tester1")

        response = client.post(
            f"{settings.API_V1_STR}/users/create",
            json=create_user_shema.model_dump(),
        )

        assert response.status_code == 401

    def test_create_user_should_raise_400_when_user_already_exists(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """ユーザーを作成したときに既にユーザーが存在する場合400を返すテスト"""
        create_user(
            db, schemas.UserCreate(name="tester1"), id=os.environ.get("TESTER1_UID")
        )

        create_user_shema = schemas.UserCreate(name="tester1")

        response = client.post(
            f"{settings.API_V1_STR}/users/create",
            json=create_user_shema.model_dump(),
            headers=tester1_token_header,
        )

        assert response.status_code == 400

    def test_should_get_current_user(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """ユーザー一覧を取得するテスト"""

        create_user(
            db, schemas.UserCreate(name="tester1"), id=os.environ.get("TESTER1_UID")
        )
        response = client.get(
            f"{settings.API_V1_STR}/users/get_my_profile", headers=tester1_token_header
        )
        assert response.status_code == 200

        resp = response.json()

        assert resp["name"] == "tester1"
        assert resp["id"] == os.environ.get("TESTER1_UID")

    def test_read_user_me_should_raise_404_when_user_not_found(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """ユーザー一覧を取得したときにユーザーが存在しない場合404を返すテスト"""

        response = client.get(
            f"{settings.API_V1_STR}/users/get_my_profile", headers=tester1_token_header
        )

        assert response.status_code == 404

    def test_update_user_me_should_return_updated_user_when_valid_input_is_given(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """ユーザー情報を更新するテスト"""

        create_user(
            db, schemas.UserCreate(name="tester1"), id=os.environ.get("TESTER1_UID")
        )
        update_user_schema = schemas.UserUpdate(name="tester1_updated")

        response = client.put(
            f"{settings.API_V1_STR}/users/update",
            json=update_user_schema.model_dump(),
            headers=tester1_token_header,
        )
        assert response.status_code == 200

        resp = response.json()

        assert resp["name"] == "tester1_updated"
        assert resp["id"] == os.environ.get("TESTER1_UID")

    def test_update_user_me_should_raise_404_when_user_not_found(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """ユーザー情報を更新したときにユーザーが存在しない場合404を返すテスト"""

        update_user_schema = schemas.UserUpdate(name="tester1_updated")

        response = client.put(
            f"{settings.API_V1_STR}/users/update",
            json=update_user_schema.model_dump(),
            headers=tester1_token_header,
        )

        assert response.status_code == 404
