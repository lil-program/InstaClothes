from app import models, schemas
from sqlalchemy.orm import Session

def create_user(db: Session, user: schemas.UserCreate, id: str) -> models.User:
    """ユーザーを作成する

    Args:
        db (Session): DBセッション
        user (schemas.UserCreate): ユーザー情報
        id (str): ユーザーID

    Returns:
        models.User: 作成されたユーザー情報
    """
    db_user = models.User(id=id, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
    