from .database import Base
from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Enum
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship
import enum



class UserRole(str, enum.Enum):
    seeker = "seeker"
    provider = "provider"

  
class User(Base):
    """user model"""
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False,
                        server_default=text('now()'))


class Role(Base):
    """userRole model"""
    __tablename__ = 'userRoles'

    id = Column(Integer, primary_key=True, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.seeker)
    user_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"),
                   nullable=False)


class Profile(Base):
    """profile model"""
    __tablename__ = 'profiles'

    id = Column(Integer, primary_key=True, nullable=False)
    bio = Column(String, nullable=False)
    location = Column(String, nullable=False)
    profile_picture = Column(String, nullable=True)
    contact_info = Column(String, nullable=False)
    user_id = Column(Integer,
                     ForeignKey('users.id', ondelete="CASCADE"),
                     nullable=False)


class Service(Base):
    """Service model"""
    __tablename__ = 'services'

    id = Column(Integer, primary_key=True, nullable=False)
    service_type = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)
    location = Column(String(200), nullable=False)
    available = Column(Boolean, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False,
                        server_default=text('now()'))
    user_id = Column(Integer,
                     ForeignKey('users.id', ondelete="CASCADE"),
                     nullable=False)


class Booking(Base):
    """booking model"""
    __tablename__ = 'bookings'

    id = Column(Integer, primary_key=True, nullable=False)
    status = Column(String, nullable=False)
    schedule_time = Column(TIMESTAMP(timezone=True), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False,
                        server_default=text('now()'))

    user_id = Column(Integer,
                     ForeignKey('users.id', ondelete="CASCADE"),
                     nullable=False)
    service_id = Column(Integer, ForeignKey('services.id', ondelete="CASCADE"),
                     nullable=False)



class Review(Base):
    """Review model"""
    __tablename__ = 'reviews'

    id  = Column(Integer, primary_key=True, nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False,
                        server_default=text('now()'))

    user_id = Column(Integer,
                     ForeignKey('users.id', ondelete="CASCADE"),
                     nullable=False)
    service_id = Column(Integer,
                        ForeignKey('services.id', ondelete="CASCADE"),
                        nullable=False)

    

    