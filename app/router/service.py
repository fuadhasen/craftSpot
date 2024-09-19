from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from .. import schema, database, models, utils, oauth2
from sqlalchemy.orm import Session
from typing import Optional

router = APIRouter(
    prefix="/api/service",
    tags=['Services']
)


@router.post('/', status_code=status.HTTP_201_CREATED)
def create_services(service: schema.CreateService,
                    db: Session = Depends(database.get_db),
                    current_user: int = Depends(oauth2.get_current_user)):
    """create service"""
    service_query = db.query(models.Service).filter(models.Service.user_id == current_user.id,
                                                    models.Service.service_type == service.service_type
                                                ).first()
    if service_query:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Service Already exist")

    role_query = db.query(models.Role).filter(models.Role.user_id == current_user.id).first()
    if role_query.role != "provider":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="provider can only create service")
    _dict = service.model_dump()
    _dict["user_id"] = current_user.id
    new_service = models.Service(**_dict)

    db.add(new_service)
    db.commit()
    db.refresh(new_service)

    return {"service": new_service}


@router.put('/{id}')
def update_service(id: int, service: schema.CreateService,
                    db: Session = Depends(database.get_db),
                    current_user: int = Depends(oauth2.get_current_user)):
    """Update an existing profile"""
    # user = db.query(models.User).filter(models.User.id == current_user.id).first()
    # if not user:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    service_query = db.query(models.Service).filter(models.Service.id == id)
    if not service_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

    if service_query.first().user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not Authorized")

    service_query.update(service.model_dump())
    db.commit()

    return service_query.first()


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_service(id: int, db: Session = Depends(database.get_db),
                    current_user: int = Depends(oauth2.get_current_user)):
    """delete an existing profile"""
    # user = db.query(models.User).filter(models.User.id == current_user.id).first()
    # if not user:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    service_query = db.query(models.Service).filter(models.Service.id == id)
    if not service_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

    if service_query.first().user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not Authorized")

    service_query.delete()
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get('/{id}')
def get_service(id: int, db: Session = Depends(database.get_db)):
    """get specific service service"""
    service_query = db.query(models.Service).filter(models.Service.id == id)
    if not service_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

    return service_query.first()


@router.get('/')
def get_services(db: Session = Depends(database.get_db),
                 limit: int = 10, skip: int = 0,
                 search: Optional[str] = ""):
    """get service by service type"""
    service_query = db.query(models.Service).filter(models.Service.service_type.contains(search))
    if not service_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

    return service_query.first()

