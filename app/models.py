import enum
from sqlalchemy import (
    Column,
    String,
    Float,
    Integer,
    Boolean,
    ForeignKey,
    Enum,
)
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    """user model"""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
    )
    updated_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
        onupdate=text("now()"),
    )
    services = relationship("Service", back_populates="user", cascade="all, delete")
    profile = relationship("Profile", back_populates="user", cascade="all, delete")
    bookings = relationship("Booking", back_populates="user", cascade="all, delete")


class Profile(Base):
    """profile model"""

    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, nullable=False)
    bio = Column(String, nullable=True)
    picture = Column(String, nullable=True)
    addresse = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    user = relationship("User", back_populates="profile", cascade="all, delete")


class Service(Base):
    """Service model"""

    __tablename__ = "services"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    type = Column(String(100), nullable=False)
    image = Column(String(200), nullable=True)
    description = Column(String(500), nullable=True)
    pricing = Column(Float, nullable=False)
    location = Column(String(200), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    available = Column(Boolean, default=True)
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
    )
    updated_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
        onupdate=text("now()"),
    )
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    bookings = relationship("Booking", back_populates="service", cascade="all, delete")
    user = relationship("User", back_populates="services", cascade="all, delete")


class Rating(int, enum.Enum):
    one = 1
    two = 2
    three = 3
    four = 4
    five = 5


# Booking Status Enum
class Status(str, enum.Enum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"
    completed = "completed"
    cancelled = "cancelled"


class Booking(Base):
    """booking model"""

    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, nullable=False)
    status = Column(Enum(Status), default=Status.pending)
    schedule_time = Column(TIMESTAMP(timezone=True), nullable=False)
    rating = Column(Enum(Rating), nullable=True)
    review = Column(String, nullable=True)
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
    )
    updated_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
        onupdate=text("now()"),
    )
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    service_id = Column(
        Integer, ForeignKey("services.id", ondelete="CASCADE"), nullable=False
    )
    user = relationship("User", back_populates="bookings", cascade="all, delete")
    service = relationship("Service", back_populates="bookings", cascade="all, delete")
