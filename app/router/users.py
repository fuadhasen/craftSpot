from fastapi import status, HTTPException, Depends, APIRouter
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import database, models, schemas, utils, oauth2

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.UserResponse,
)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    """route for creating user"""
    user_query = db.query(models.User).filter(models.User.email == user.email).first()
    if user_query:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already exists"
        )

    hashed_pwd = utils.hash(user.password)
    user.password = hashed_pwd
    user_data = user.model_dump()
    user_obj = models.User(**user_data)
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)

    return user_obj


@router.post(
    "/login",
    status_code=status.HTTP_200_OK,
    response_model=schemas.TokenResponse,
)
def login(
    db: Session = Depends(database.get_db),
    credentials: OAuth2PasswordRequestForm = Depends(),
):
    """route for user login"""
    user_query = (
        db.query(models.User).filter(models.User.email == credentials.username).first()
    )
    if not user_query:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid credentials"
        )

    if not utils.verify(credentials.password, user_query.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid credentials"
        )

    token = oauth2.create_token({"user_id": user_query.id})
    return {"token": token, "token_type": "bearer"}


@router.put(
    "/me",
    status_code=status.HTTP_200_OK,
    response_model=schemas.UserResponse,
)
def update_me(
    profile: schemas.ProfileUpdate,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    """Update current user profile"""
    user_query = db.query(models.User).filter(models.User.id == current_user.id).first()
    if not user_query:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    profile_data = profile.model_dump(exclude_unset=True)
    # update the profile

    for key, value in profile_data.items():
        setattr(user_query.profile, key, value)

    db.commit()
    db.refresh(user_query)
    return user_query


@router.get(
    "/me",
    status_code=status.HTTP_200_OK,
    response_model=schemas.UserResponse,
)
def get_me(
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    """Get current user profile"""
    user = db.query(models.User).filter(models.User.id == current_user.id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return user
