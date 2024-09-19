from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from .. import schema, database, models, utils, oauth2
from sqlalchemy.orm import Session
from typing import Optional

router = APIRouter(
    prefix="/api/booking",
    tags=['Services']
)


@router.post('/')
def create_booking(book: schema.CreateBooking,
                   db: Session = Depends(database.get_db),
                   current_user: int = Depends(oauth2.get_current_user)):
    """booking the existing services"""
    service_query = db.query(models.Service).filter(models.Service.id == book.service_id).first()
    if not service_query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail="Service Not Found")

    role_query = db.query(models.Role).filter(models.Role.user_id == current_user.id).first()
    if role_query.role != "seeker":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="seeker can only book services")

    _dict = book.model_dump()
    _dict["user_id"] = current_user.id
    book_obj = models.Booking(**_dict)
    db.add(book_obj)
    db.commit()
    db.refresh(book_obj)
    return book_obj


@router.get('/')
def get_booking(db: Session = Depends(database.get_db),
                current_user: int = Depends(oauth2.get_current_user)):
    """get booking"""
    book_query = db.query(models.Booking).filter(models.Booking.user_id == current_user.id).first()
    if not book_query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Booking is not found for this user")
    return book_query


@router.put('/{id}')
def update_booking(id: int, book: schema.CreateBooking,
                   db: Session = Depends(database.get_db),
                   current_user: int = Depends(oauth2.get_current_user)):
    """update booking"""
    book_query = db.query(models.Booking).filter(models.Booking.id == id)
    if not book_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    if book_query.first().user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not Authorized")

    book_query.update(book.model_dump())
    db.commit()

    return book_query.first()


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_booking(id: int,
                   db: Session = Depends(database.get_db),
                   current_user: int = Depends(oauth2.get_current_user)):
    """delete booking"""
    book_query = db.query(models.Booking).filter(models.Booking.id == id)
    if not book_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    if book_query.first().user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not Authorized")

    book_query.delete()
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
