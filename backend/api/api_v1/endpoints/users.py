import crud
import schemas
from api import deps
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/api/")
async def hello():
    return {"msg": "Hello, this is API server"}


@router.get("/api/me")
async def hello_user(user=Depends(deps.get_current_user)):
    return {"msg": "Hello, user", "uid": user["uid"]}


@router.post("/hello")
def create_message(message: str, cred: dict = Depends(deps.get_current_user)):
    uid = cred.get("uid")
    return {"message": f"Hello, {message}! Your uid is [{uid}]"}


@router.post("/create_user", response_model=schemas.User)
async def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
    cred: dict = Depends(deps.get_current_user),
) -> schemas.User:
    uid = cred.get("uid")
    display_name = cred.get("displayName", None)  # FirebaseからdisplayNameを取得

    if not uid:
        raise HTTPException(status_code=401, detail="Could not retrieve user ID.")

    existing_user = crud.user.get(db, id=uid)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists.")

    user = crud.user.create_with_uid_and_display_name(
        db=db, uid=uid, obj_in=user_in, display_name=display_name
    )

    return user


@router.get("/users/me", response_model=schemas.User)
async def read_user_me(
    *, db: Session = Depends(deps.get_db), cred: dict = Depends(deps.get_current_user)
) -> schemas.User:
    uid = cred.get("uid")
    if not uid:
        raise HTTPException(status_code=401, detail="Could not retrieve user ID.")

    user = crud.user.get(db, id=uid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    print(cred)
    return user


@router.put("/users/me", response_model=schemas.User)
async def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserUpdate,
    cred: dict = Depends(deps.get_current_user),
) -> schemas.User:
    uid = cred.get("uid")
    if not uid:
        raise HTTPException(status_code=401, detail="Could not retrieve user ID.")

    user = crud.user.get(db, id=uid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    user = crud.user.update(db, db_obj=user, obj_in=user_in)
    return user
