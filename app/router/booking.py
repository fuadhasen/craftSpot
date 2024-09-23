from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List

from app import database, models, schemas, oauth2

router = APIRouter(prefix="/api/booking", tags=["Services Booking"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.BookingResponse,
)
def create_booking(
    booking_data: schemas.BookingCreate,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    # Check if the service exists
    service_query = db.query(models.Service).filter(
        models.Service.id == booking_data.service_id,
        models.Service.available,
    )

    if not service_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Service not found"
        )
    # Create booking with status pending
    booking = models.Booking(
        **booking_data.model_dump(),
        status=models.Status.pending,
        user_id=current_user.id,
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=List[schemas.BookingResponse],
)
def get_bookings(
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    """get booking"""
    book_query = (
        db.query(models.Booking).filter(models.Booking.user_id == current_user.id).all()
    )
    if not book_query:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No Booking Found",
        )
    return book_query


@router.get(
    "/{id}",
    status_code=status.HTTP_200_OK,
    response_model=schemas.BookingResponse,
)
def get_booking(
    id: int,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    """get booking"""
    book_query = db.query(models.Booking).filter(models.Booking.id == id).first()
    if not book_query:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return book_query


@router.put(
    "/{id}",
    status_code=status.HTTP_200_OK,
    response_model=schemas.BookingResponse,
)
def update_booking(
    id: int,
    book: schemas.BookingUpdate,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    """update booking"""
    book_query = db.query(models.Booking).filter(models.Booking.id == id)
    if not book_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found"
        )

    if book_query.first().user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not Authorized"
        )

    book_query.update(book.model_dump(exclude_unset=True))
    db.commit()
    db.refresh(book_query.first())
    return book_query.first()


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_booking(
    id: int,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    """delete booking"""
    book_query = db.query(models.Booking).filter(models.Booking.id == id)
    if not book_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found"
        )

    if book_query.first().user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not Authorized"
        )

    book_query.delete()
    db.commit()
