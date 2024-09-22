from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import database, models, utils, oauth2, schema


router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/login", response_model=schema.TokenResponse)
def login(
    user_credential: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db),
):
    """login route"""
    # accept username and password format
    # validate then return token
    user = (
        db.query(models.User)
        .filter(models.User.email == user_credential.username)
        .first()
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials"
        )
    if not utils.verify(user_credential.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials"
        )

    token = oauth2.create_token(data={"user_id": user.id})
    return {"token": token, "token_type": "bearer"}
