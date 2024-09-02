from pydantic import BaseModel, EmailStr
from datetime import datetime
from .models import UserRole

class UserCreate(BaseModel):
    """usercreate validation"""
    name: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.seeker


class UserResponse(BaseModel):
    """userResponse validation"""
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    class config:
        orm_mode = True


class login(BaseModel):
    """login validation"""
    email: EmailStr
    password: str


class TokenData(BaseModel):
    """tokend data validation"""
    id: str


class TokenResponse(BaseModel):
    """token response validation"""
    token: str
    token_type: str
