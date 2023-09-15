from pydantic import BaseModel


class ClosetBase(BaseModel):
    name: str


class ClosetCreate(ClosetBase):
    pass


class ClosetUpdate(ClosetBase):
    pass


class ClosetInDBBase(ClosetBase):
    id: str
    name: str
    user_id: str

    model_config = {"from_attributes": True}


class Closet(ClosetInDBBase):
    pass
