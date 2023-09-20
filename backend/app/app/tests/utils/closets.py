from sqlalchemy.orm import Session

from app import models, schemas


def create_closet_with_uid(
    db: Session, uid: str, closet: schemas.ClosetCreate
) -> models.Closet:
    """ユーザーIDを指定してclosetを作成する

    Args:
        db (Session): DBセッション
        uid (str): ユーザーID
        closet (schemas.ClosetCreate): closet情報

    Returns:
        models.Closet: 作成されたcloset情報
    """
    # user_idのUserが存在しない場合作成する
    user = db.query(models.User).filter(models.User.id == uid).first()
    if not user:
        db_user = models.User(id=uid, name="tester")
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

    db_closet = models.Closet(**closet.model_dump(), user_id=uid)
    db.add(db_closet)
    db.commit()
    db.refresh(db_closet)
    return db_closet
