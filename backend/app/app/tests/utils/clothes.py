from sqlalchemy.orm import Session

from app import models, schemas


def create_clothes_with_closet_id_and_img_path(
    db: Session, closet_id: str, img_path: str, clothes: schemas.ClothesCreate
) -> models.Clothes:
    """closet_idを指定してclothesを作成する

    Args:
        db (Session): DBセッション
        closet_id (str): closet_id
        clothes (schemas.ClothesCreate): clothes情報

    Returns:
        models.Clothes: 作成されたclothes情報
    """
    db_clothes = models.Clothes(
        **clothes.model_dump(), closet_id=closet_id, img_path=img_path
    )
    db.add(db_clothes)
    db.commit()
    db.refresh(db_clothes)
    return db_clothes
