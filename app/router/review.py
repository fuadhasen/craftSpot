from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from .. import schema, database, models, utils, oauth2
from sqlalchemy.orm import Session
from typing import Optional

router = APIRouter(
    prefix="/api/review",
    tags=['Services']
)


@router.post('/', status_code=status.HTTP_201_CREATED)
def create_review(review: schema.Review,
                  db: Session = Depends(database.get_db),
                  current_user: int = Depends(database.get_db)):
    """create review"""
    service_query = db.query(models.Service).filter(models.Service.id == review.service_id).first()
    if not service_query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail="Service Not Found")

    role_query = db.query(models.Role).filter(models.Role.user_id == current_user.id).first()
    if role_query.role != "seeker":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="seeker can only review services")

    _dict = review.model_dump()
    _dict["user_id"] = current_user.id
    review_obj = models.Review(**_dict)
    db.add(review_obj)
    db.commit()
    db.refresh(review_obj)
    return review_obj

