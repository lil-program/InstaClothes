import crud
import schemas
from api import deps
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/create_closet", response_model=schemas.Closet)
async def create_closet(
    *,
    db: Session = Depends(deps.get_db),
    closet_in: schemas.ClosetCreate,
    cred: dict = Depends(deps.get_current_user),
) -> schemas.Closet:
    uid = cred.get("uid")
    if not uid:
        raise HTTPException(status_code=401, detail="Could not retrieve user ID.")

    closet = crud.closet.create_with_uid(db=db, uid=uid, obj_in=closet_in)

    return closet


@router.put("/update_closet/{closet_id}", response_model=schemas.Closet)
async def update_closet(
    *,
    closet_id: str,
    db: Session = Depends(deps.get_db),
    closet_in: schemas.ClosetUpdate,
    cred: dict = Depends(deps.get_current_user),
) -> schemas.Closet:
    uid = cred.get("uid")
    if not uid:
        raise HTTPException(status_code=401, detail="Could not retrieve user ID.")

    # ここで特定のclosetをuidとcloset_idで検索し、存在しない場合はエラーを返す
    existing_closet = crud.closet.get_by_id_and_user(
        db, closet_id=closet_id, user_id=uid
    )
    if not existing_closet:
        raise HTTPException(status_code=404, detail="Closet not found.")

    # 更新処理
    closet = crud.closet.update(db, db_obj=existing_closet, obj_in=closet_in)

    return closet


@router.get("/closets", response_model=list[schemas.Closet])
async def read_closets(
    *, db: Session = Depends(deps.get_db), cred: dict = Depends(deps.get_current_user)
) -> list[schemas.Closet]:
    uid = cred.get("uid")
    if not uid:
        raise HTTPException(status_code=401, detail="Could not retrieve user ID.")

    closets = crud.closet.get_multi_by_user(db, user_id=uid)
    return closets
