from typing import Optional

from crud.base import CRUDBase
from fastapi.encoders import jsonable_encoder
from models.clothes import Clothes
from schemas.clothes import ClothesCreate, ClothesUpdate
from sqlalchemy.orm import Session


class CRUDClothes(CRUDBase[Clothes, ClothesCreate, ClothesUpdate]):
    def create_with_uid_closet_id(
        self,
        db: Session,
        *,
        uid: str,
        closet_id: str,
        obj_in: ClothesCreate,
    ) -> Clothes:
        """ユーザーIDとクローゼットIDを使用してクローゼットを作成する

        Args:
            db (Session): DBセッション
            uid (str): ユーザーID
            closet_id (str): クローゼットID
            obj_in (ClosetCreate): クローゼット情報

        Returns:
            Closet: 作成されたクローゼット
        """
        closet_data = jsonable_encoder(obj_in)
        db_closet = Clothes(closet_id=closet_id, **closet_data)
        db.add(db_closet)
        db.commit()
        db.refresh(db_closet)
        return db_closet

    def get_by_closet_id(
        self,
        db: Session,
        *,
        closet_id: str,
    ) -> Optional[Clothes]:
        """クローゼットIDを使用してクローゼットを取得する

        Args:
            db (Session): DBセッション
            closet_id (str): クローゼットID

        Returns:
            Optional[Closet]: クローゼット
        """
        return db.query(Clothes).filter(Clothes.closet_id == closet_id).all()


clothes = CRUDClothes(Clothes)
