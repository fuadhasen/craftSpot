from pydantic import BaseModel, EmailStr, constr, HttpUrl, Field
from datetime import datetime
from .models import UserRole
from typing import Optional


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
    current_role: UserRole
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


class UpdateRole(BaseModel):
    """role update validation"""

    role: UserRole


class CreateProfile(BaseModel):
    """profile creation validation"""

    bio: str
    location: str = Field(...)
    profile_picture: str  # Optional[HttpUrl] = None
    contact_info: str


class CreateService(BaseModel):
    """service create validation"""
    service_name: str
    service_description: str
    service_price: float
    service_location: str
    latitude: Optional[float] = None 
    longitude: Optional[float] = None
    service_picture: str
    service_category: str




class Review(BaseModel):
    """review validation"""

    rating: str
    comment: str
    service_id: int

class ServiceResponse(CreateService):
    """service response with reviews"""
    id: int
    rating: str
    reviews: Optional[Review] = None

class CreateBooking(BaseModel):
    """booking validation"""

    service_id: int
    booking_date: datetime
    booking_time: datetime
    booking_location: str
    latitude: Optional[float] = None 
    longitude: Optional[float] = None
    booking_price: float