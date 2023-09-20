import os
import uuid
from typing import Dict

from dotenv import load_dotenv
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import schemas
from app.core.config import settings
from app.tests.utils.closets import create_closet_with_uid
from app.tests.utils.users import create_user

# 環境変数を読み込む
load_dotenv(override=True)


class TestCloset:
    def test_create_closet_should_return_new_closet_when_all_parameters_are_valid(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """closetを作成するテスト"""
        create_user(
            db, schemas.UserCreate(name="tester1"), id=os.environ.get("TESTER1_UID")
        )

        create_closet_shema = schemas.ClosetCreate(name="closet1")

        response = client.post(
            f"{settings.API_V1_STR}/closets/create",
            json=create_closet_shema.model_dump(),
            headers=tester1_token_header,
        )

        assert response.status_code == 200

        resp = response.json()

        assert resp["name"] == "closet1"
        assert resp["user_id"] == os.environ.get("TESTER1_UID")

    def test_read_closets_should_return_list_of_closets_when_user_is_valid(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """closetを取得するテスト"""
        # テスト用closetを作成
        create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )
        create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet2"),
        )

        response = client.get(
            f"{settings.API_V1_STR}/closets/get_my_closets",
            headers=tester1_token_header,
        )

        assert response.status_code == 200

        resp = response.json()

        assert len(resp) == 2
        assert resp[0]["name"] == "closet1"
        assert resp[1]["name"] == "closet2"

    def test_update_closet_should_return_updated_closet_when_valid_input_is_given(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """closetを更新するテスト"""
        # テスト用closetを作成
        closet = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )

        update_closet_shema = schemas.ClosetUpdate(name="closet2")

        response = client.put(
            f"{settings.API_V1_STR}/closets/update/{closet.id}",
            json=update_closet_shema.model_dump(),
            headers=tester1_token_header,
        )

        assert response.status_code == 200

        resp = response.json()

        assert resp["name"] == "closet2"

    def test_update_closet_should_raise_404_when_closet_not_found(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """closetを更新したときにclosetが存在しない場合404を返すテスト"""
        # テスト用closetを作成
        create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )

        update_closet_shema = schemas.ClosetUpdate(name="closet2")

        response = client.put(
            f"{settings.API_V1_STR}/closets/update/{uuid.uuid4()}",
            json=update_closet_shema.model_dump(),
            headers=tester1_token_header,
        )

        assert response.status_code == 404

    def test_delete_closet_should_remove_specified_closets_when_valid_ids_given(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """closetを削除するテスト"""
        # テスト用closetを作成
        closet1 = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )
        closet2 = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet2"),
        )

        delete_closet_schema = schemas.ClosetDelete(closet_ids=[closet1.id, closet2.id])

        response = client.request(
            method="DELETE",
            url=f"{settings.API_V1_STR}/closets/delete",
            headers={**tester1_token_header, "Content-Type": "application/json"},
            json=delete_closet_schema.model_dump(),
        )

        print(response.json())

        assert response.status_code == 200

        resp = response.json()

        assert len(resp) == 2
        assert resp[0]["name"] == "closet1"
        assert resp[1]["name"] == "closet2"

    def test_delete_closet_should_raise_404_when_any_closet_id_is_not_found(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """closetを削除したときにclosetが存在しない場合404を返すテスト"""
        # テスト用closetを作成
        closet1 = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )

        delete_closet_schema = schemas.ClosetDelete(
            closet_ids=[closet1.id, str(uuid.uuid4())]
        )

        response = client.request(
            method="DELETE",
            url=f"{settings.API_V1_STR}/closets/delete",
            headers={**tester1_token_header, "Content-Type": "application/json"},
            json=delete_closet_schema.model_dump(),
        )

        assert response.status_code == 404

    def test_read_closet_should_return_closet_details_when_valid_closet_id_given(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """closet_idを指定してclosetを取得するテスト"""
        # テスト用closetを作成
        closet = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )

        response = client.get(
            f"{settings.API_V1_STR}/closets/get/{closet.id}",
            headers=tester1_token_header,
        )

        assert response.status_code == 200

        resp = response.json()

        assert resp["name"] == "closet1"
        assert resp["id"] == closet.id

    def test_read_closet_should_raise_404_when_closet_not_found(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """closet_idを指定してclosetを取得したときにclosetが存在しない場合404を返すテスト"""
        # テスト用closetを作成
        closet = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )

        response = client.get(
            f"{settings.API_V1_STR}/closets/get/{uuid.uuid4()}",
            headers=tester1_token_header,
        )

        assert response.status_code == 404
