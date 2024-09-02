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
    role = Column(Enum(UserRole), default=UserRole.seeker)


class Role(Base):
    """userRole model"""
    __tablename__ = 'userRoles'
    id = Column(Integer, primary_key=True, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.seeker)
    user_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"),
                   nullable=False)
