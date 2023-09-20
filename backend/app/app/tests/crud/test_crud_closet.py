import os

from dotenv import load_dotenv
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.tests.utils.closets import create_closet_with_uid
from app.tests.utils.users import create_user

load_dotenv(override=True)


class TestCrudCloset:
    def test_create_with_uid(self, db: Session) -> None:
        user_initial_count = db.query(models.User).count()

        user = create_user(
            db=db, user=schemas.UserCreate(name="test"), id=os.environ["TESTER1_UID"]
        )
        schemas.ClosetCreate(name="test")

        closet = crud.closet.create_with_uid(
            db=db,
            uid=user.id,
            obj_in=schemas.ClosetCreate(name="test", description="test"),
        )

        assert closet.name == "test"
        assert closet.user_id == user.id

        assert db.query(models.User).count() == user_initial_count + 1

    def test_get_by_id_and_user(self, db: Session) -> None:
        user = create_user(
            db=db, user=schemas.UserCreate(name="test"), id=os.environ["TESTER1_UID"]
        )
        closet = create_closet_with_uid(
            db=db,
            uid=user.id,
            closet=schemas.ClosetCreate(name="test"),
        )

        closet2 = crud.closet.get_by_id_and_user(
            db=db, closet_id=closet.id, user_id=user.id
        )

        assert closet2
        assert closet.name == closet2.name
    
    def test_get_multi_by_user(self, db: Session) -> None:
        user = create_user(
            db=db, user=schemas.UserCreate(name="test"), id=os.environ["TESTER1_UID"]
        )
        closet = create_closet_with_uid(
            db=db,
            uid=user.id,
            closet=schemas.ClosetCreate(name="test"),
        )
        closet2 = create_closet_with_uid(
            db=db,
            uid=user.id,
            closet=schemas.ClosetCreate(name="test2"),
        )
        closet3 = create_closet_with_uid(
            db=db,
            uid=user.id,
            closet=schemas.ClosetCreate(name="test3"),
        )

        closets = crud.closet.get_multi_by_user(db=db, user_id=user.id)

        assert closets
        assert len(closets) == 3
        assert closet.name == closets[0].name
        assert closet2.name == closets[1].name
        assert closet3.name == closets[2].name
