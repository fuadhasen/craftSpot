from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import Optional, List
from app import database, models, schemas, oauth2

router = APIRouter(prefix="/api/services", tags=["Services"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.ServiceResponse,
)
def create_services(
    service_data: schemas.ServiceCreate,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    """create service"""
    service_query = db.query(models.Service).filter(
        models.Service.user_id == current_user.id,
        models.Service.type == service_data.type,
    )

    if service_query.first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Service already exists.",
        )

    service = models.Service(**service_data.model_dump(), user_id=current_user.id)

    db.add(service)
    db.commit()
    db.refresh(service)

    return service


@router.put(
    "/{id}",
    response_model=schemas.ServiceResponse,
    status_code=status.HTTP_200_OK,
)
def update_service(
    id: int,
    service_data: schemas.ServiceUpdate,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    """Update an existing profile"""

    service_query = db.query(models.Service).filter(models.Service.id == id)
    if not service_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Service not found"
        )

    if service_query.first().user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not Authorized"
        )

    service_query.update(service_data.model_dump(exclude_unset=True))
    db.commit()

    return service_query.first()


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_service(
    id: int,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    """delete service"""

    service_query = db.query(models.Service).filter(models.Service.id == id)
    if not service_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Service not found"
        )

    if service_query.first().user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not Authorized"
        )

    service_query.delete()
    db.commit()


@router.get(
    "/{id}",
    status_code=status.HTTP_200_OK,
    response_model=schemas.ServiceResponse,
)
def get_service(id: int, db: Session = Depends(database.get_db)):
    """get specific service service"""
    service_query = db.query(models.Service).filter(models.Service.id == id)
    if not service_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Service not found"
        )

    return service_query.first()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=List[schemas.ServiceResponse],
)
def get_services(
    db: Session = Depends(database.get_db),
    limit: int = 3,
    skip: int = 0,
    search: Optional[str] = "",
):
    """get service by service type"""
    service_query = db.query(models.Service).filter(
        models.Service.type.contains(search)
    )
    if not service_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No service found."
        )

    return service_query.offset(skip).limit(limit).all()


@router.post("/{id}/book", status_code=status.HTTP_201_CREATED)
def book_service(
    id: int,
    booking_data: schemas.BookingCreate,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    """book a service"""
    service_query = db.query(models.Service).filter(models.Service.id == id)
    if not service_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Service not found"
        )

    booking = models.Booking(
        **booking_data.model_dump(),
        user_id=current_user.id,
        service_id=id,
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking
