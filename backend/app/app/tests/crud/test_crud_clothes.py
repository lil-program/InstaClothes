import os

from dotenv import load_dotenv
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.tests.utils.closets import create_closet_with_uid
from app.tests.utils.clothes import create_clothes_with_closet_id_and_img_path
from app.tests.utils.users import create_user

load_dotenv(override=True)


class TestCrudClothes:
    def test_create_with_uid_closet_id(self, mocker, db: Session) -> None:
        mocker.patch(
            "app.functions.get_img_path.get_img_path",
            return_value="https://www.sample_img.com",
        )
        user_initial_count = db.query(models.User).count()

        user = create_user(
            db=db, user=schemas.UserCreate(name="test"), id=os.environ["TESTER1_UID"]
        )
        closet = create_closet_with_uid(
            db=db,
            uid=user.id,
            closet=schemas.ClosetCreate(name="test"),
        )

        clothes = crud.clothes.create_with_uid_closet_id(
            db=db,
            uid=user.id,
            closet_id=closet.id,
            obj_in=schemas.ClothesCreate(
                name="test",
                shop_url="https://www.sample_shop.com",
            ),
        )

        assert clothes.name == "test"
        assert clothes.closet_id == closet.id

        assert db.query(models.User).count() == user_initial_count + 1

    def test_get_by_closet_id(self, db: Session) -> None:
        user = create_user(
            db=db, user=schemas.UserCreate(name="test"), id=os.environ["TESTER1_UID"]
        )
        closet = create_closet_with_uid(
            db=db,
            uid=user.id,
            closet=schemas.ClosetCreate(name="test"),
        )
        clothes = create_clothes_with_closet_id_and_img_path(
            db=db,
            closet_id=closet.id,
            img_path="https://www.sample_img.com",
            clothes=schemas.ClothesCreate(
                name="test",
                shop_url="https://www.sample_shop.com",
            ),
        )

        clothes2 = crud.clothes.get_by_closet_id(db=db, closet_id=closet.id)

        assert clothes2
        assert clothes.name == clothes2[0].name
