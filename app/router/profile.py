from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from .. import schema, database, models, utils, oauth2
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/api/profile",
    tags=['profile']
)

@router.post('/')
def create_profile(profile: schema.CreateProfile,
                   db: Session = Depends(database.get_db),
                   current_user: int = Depends(oauth2.get_current_user)):
    """Create a new profile"""
    # user = db.query(models.User).filter(models.User.id == current_user.id).first()
    # if not user:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not found")

    profile_query = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    if profile_query:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="profile Already exist")


    _dict = profile.model_dump()
    _dict["user_id"] = current_user.id
    new_profile = models.Profile(**_dict)

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {"profile": new_profile}



@router.put('/{id}')
def update_profile(id: int, profile: schema.CreateProfile,
                    db: Session = Depends(database.get_db),
                    current_user: int = Depends(oauth2.get_current_user)):
    """Update an existing profile"""
    # user = db.query(models.User).filter(models.User.id == current_user.id).first()
    # if not user:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    profile_query = db.query(models.Profile).filter(models.Profile.id == id)
    if not profile_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="profile not found")

    if profile_query.first().user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not Authorized")

    profile_query.update(profile.model_dump())
    db.commit()

    return profile_query.first()


@router.get('/{id}')
def get_profile(id: int, db: Session = Depends(database.get_db),
                current_user: int = Depends(oauth2.get_current_user)):
    """get specific user profile"""
    profile_query = db.query(models.Profile).filter(models.Profile.user_id == id)
    if not profile_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="profile not found")

    return profile_query.first()

