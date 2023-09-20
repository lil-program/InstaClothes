import os

from sqlalchemy.orm import Session

from app import crud, models, schemas


class TestCrudUser:
    def test_create_with_uid_and_display_name(self, db: Session) -> None:
        user_initial_count = db.query(models.User).count()

        user = crud.user.create_with_uid_and_display_name(
            db=db,
            uid=os.environ["TESTER1_UID"],
            obj_in=schemas.UserCreate(name="test"),
            display_name="test",
        )

        assert user.name == "test"
        assert user.id == os.environ["TESTER1_UID"]

        assert db.query(models.User).count() == user_initial_count + 1

    def test_create_with_uid_and_display_name_already_exists(self, db: Session) -> None:
        user_initial_count = db.query(models.User).count()

        user1 = crud.user.create_with_uid_and_display_name(
            db=db,
            uid=os.environ["TESTER1_UID"],
            obj_in=schemas.UserCreate(name="test"),
            display_name="test",
        )

        user2 = crud.user.create_with_uid_and_display_name(
            db=db,
            uid=os.environ["TESTER1_UID"],
            obj_in=schemas.UserCreate(name="test2"),
            display_name="test2",
        )

        assert user2.name == user1.name
        assert user2.id == os.environ["TESTER1_UID"]

        assert db.query(models.User).count() == user_initial_count + 1
