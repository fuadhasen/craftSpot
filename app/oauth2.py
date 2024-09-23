from jose import JWTError, jwt
from datetime import datetime, timedelta, UTC
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app import database, models, schemas
from app.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/users/login")


SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes


def create_token(data: dict):
    """create access token"""
    to_encode = data.copy()
    expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str, credential_exception):
    """verify access token"""
    try:
        print(token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = str(payload.get("user_id"))
        if not id:
            raise credential_exception
        token_data = schemas.TokenData(id=id)
    except JWTError:
        raise credential_exception
    return token_data


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)
):
    """get current user"""
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid Credential",
        headers={"WWW-Authorization": "Bearer"},
    )

    token = verify_token(token, credential_exception)
    user = db.query(models.User).filter(models.User.id == token.id).first()
    return user
