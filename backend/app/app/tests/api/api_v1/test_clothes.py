import os
import uuid
from typing import Dict

from dotenv import load_dotenv
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import schemas
from app.core.config import settings
from app.tests.utils.closets import create_closet_with_uid
from app.tests.utils.clothes import create_clothes_with_closet_id_and_img_path

# 環境変数を読み込む
load_dotenv(override=True)


class TestClothes:
    def test_create_clothes_should_succeed_with_valid_parameters(
        self,
        mocker,
        db: Session,
        client: TestClient,
        tester1_token_header: Dict[str, str],
    ) -> None:
        """服を作成するテスト"""

        # functions.get_img_pathのモック
        mock = mocker.patch(
            "app.functions.get_img_path.get_img_path",
            return_value="https://www.sample_img.com",
        )

        closet = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )

        create_clothes_shema = schemas.ClothesCreate(
            name="clothes1",
            shop_url="https://www.sample_shop.com",
        )

        response = client.post(
            f"{settings.API_V1_STR}/clothes/create/{closet.id}",
            json=create_clothes_shema.model_dump(),
            headers=tester1_token_header,
        )

        assert response.status_code == 200

        resp = response.json()

        assert resp["name"] == "clothes1"
        assert resp["shop_url"] == "https://www.sample_shop.com"
        # assert resp["img_path"] == "https://www.sample_img.com"
        assert resp["closet_id"] == closet.id

        # mockerが呼ばれたか確認
        assert mock.called

    def test_create_clothes_should_raise_404_when_closet_id_not_found(
        self,
        mocker,
        db: Session,
        client: TestClient,
        tester1_token_header: Dict[str, str],
    ) -> None:
        """closet_idが存在しない場合404を返すテスト"""

        # functions.get_img_pathのモック
        mocker.patch(
            "app.functions.get_img_path",
            return_value="https://www.sample_img.com",
        )

        create_clothes_shema = schemas.ClothesCreate(
            name="clothes1",
            shop_url="https://www.sample_shop.com",
        )

        response = client.post(
            f"{settings.API_V1_STR}/clothes/create/invalid_closet_id",
            json=create_clothes_shema.model_dump(),
            headers=tester1_token_header,
        )

        assert response.status_code == 404

    def test_create_clothes_should_raise_401_when_uid_is_missing(
        self, db: Session, client: TestClient
    ) -> None:
        """服を作成したときにuidがない場合401を返すテスト"""
        create_clothes_shema = schemas.ClothesCreate(
            name="clothes1",
            shop_url="https://www.sample_shop.com",
        )

        response = client.post(
            f"{settings.API_V1_STR}/clothes/create/invalid_closet_id",
            json=create_clothes_shema.model_dump(),
        )

        assert response.status_code == 401

    def test_get_my_clothes_valid_closet_id(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """closet_idが存在する場合clothesを取得するテスト"""

        closet = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )

        create_clothes_shema = schemas.ClothesCreate(
            name="clothes1",
            shop_url="https://www.sample_shop.com",
        )

        create_clothes_with_closet_id_and_img_path(
            db,
            closet_id=closet.id,
            clothes=create_clothes_shema,
            img_path="https://www.sample_img.com",
        )

        response = client.get(
            f"{settings.API_V1_STR}/clothes/get_my_clothes/{closet.id}",
            headers=tester1_token_header,
        )

        assert response.status_code == 200

        resp = response.json()

        assert resp[0]["name"] == "clothes1"
        assert resp[0]["shop_url"] == "https://www.sample_shop.com"
        assert resp[0]["img_path"] == "https://www.sample_img.com"
        assert resp[0]["closet_id"] == closet.id

    def test_get_my_clothes_invalid_closet_id(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """closet_idが存在しない場合404を返すテスト"""

        response = client.get(
            f"{settings.API_V1_STR}/clothes/get_my_clothes/invalid_closet_id",
            headers=tester1_token_header,
        )

        assert response.status_code == 404

    def test_update_clothes_should_return_updated_clothes_when_valid_input_is_given(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """clothesを更新するテスト"""
        # テスト用clothesを作成
        closet = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )
        clothes = create_clothes_with_closet_id_and_img_path(
            db,
            closet_id=closet.id,
            clothes=schemas.ClothesCreate(
                name="clothes1", shop_url="https://www.sample_shop.com"
            ),
            img_path="https://www.sample_img.com",
        )

        update_clothes_shema = schemas.ClothesUpdate(name="clothes2")

        response = client.put(
            f"{settings.API_V1_STR}/clothes/update/{clothes.id}",
            json=update_clothes_shema.model_dump(),
            headers=tester1_token_header,
        )

        assert response.status_code == 200

        resp = response.json()

        assert resp["name"] == "clothes2"

    def test_update_clothes_should_raise_404_when_clothes_not_found(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """clothesを更新したときにclothesが存在しない場合404を返すテスト"""
        # テスト用clothesを作成
        closet = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )
        create_clothes_with_closet_id_and_img_path(
            db,
            closet_id=closet.id,
            clothes=schemas.ClothesCreate(
                name="clothes1", shop_url="https://www.sample_shop.com"
            ),
            img_path="https://www.sample_img.com",
        )

        update_clothes_shema = schemas.ClothesUpdate(name="clothes2")

        response = client.put(
            f"{settings.API_V1_STR}/clothes/update/invalid_clothes_id",
            json=update_clothes_shema.model_dump(),
            headers=tester1_token_header,
        )

        assert response.status_code == 404

    def test_delete_clothes_should_return_deleted_clothes_when_valid_input_is_given(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """clothesを削除するテスト"""
        # テスト用clothesを作成
        closet = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )
        clothes = create_clothes_with_closet_id_and_img_path(
            db,
            closet_id=closet.id,
            clothes=schemas.ClothesCreate(
                name="clothes1", shop_url="https://www.sample_shop.com"
            ),
            img_path="https://www.sample_img.com",
        )

        clothes_shema = schemas.ClothesDelete(clothes_ids=[clothes.id])

        response = client.request(
            method="DELETE",
            url=f"{settings.API_V1_STR}/clothes/delete",
            headers={**tester1_token_header, "Content-Type": "application/json"},
            json=clothes_shema.model_dump(),
        )

        assert response.status_code == 200

        resp = response.json()

        assert resp[0]["name"] == "clothes1"

    def test_delete_clothes_should_raise_404_when_clothes_not_found(
        self, db: Session, client: TestClient, tester1_token_header: Dict[str, str]
    ) -> None:
        """clothesを削除したときにclothesが存在しない場合404を返すテスト"""
        # テスト用clothesを作成
        closet = create_closet_with_uid(
            db,
            uid=os.environ.get("TESTER1_UID"),
            closet=schemas.ClosetCreate(name="closet1"),
        )
        create_clothes_with_closet_id_and_img_path(
            db,
            closet_id=closet.id,
            clothes=schemas.ClothesCreate(
                name="clothes1", shop_url="https://www.sample_shop.com"
            ),
            img_path="https://www.sample_img.com",
        )

        clothes_shema = schemas.ClothesDelete(clothes_ids=[str(uuid.uuid4())])

        response = client.request(
            method="DELETE",
            url=f"{settings.API_V1_STR}/clothes/delete",
            headers={**tester1_token_header, "Content-Type": "application/json"},
            json=clothes_shema.model_dump(),
        )

        assert response.status_code == 404
        assert response.json() == {"detail": "Clothes not found."}
