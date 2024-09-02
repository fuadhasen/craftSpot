from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from .. import schema, database, models, utils, oauth2
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/api/user",
    tags=['users']
)


@router.post('/register', status_code=status.HTTP_201_CREATED,
             response_model=schema.UserResponse)
def create_user(user: schema.UserCreate, db: Session = Depends(database.get_db)):
    """route for creating user"""
    user_query = db.query(models.User).filter(models.User.email == user.email).first()
    if user_query:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="cant create two same users")
    
    hashd_pwd = utils.hash(user.password)
    user.password = hashd_pwd
    user_data = {
        'name': user.name,
        'email': user.email,
        'password': user.password
    }

    user_obj = models.User(**user_data)
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)


    user_role_obj = models.Role(role=user.role, user_id=user_obj.id)
    db.add(user_role_obj)
    db.commit()

    return user_obj


@router.put('/role')
def update_role(db: Session = Depends(database.get_db),
                current_user: int = Depends(oauth2.get_current_user)):
    """update user role"""
    role_query = db.query(models.Role).filter(
        models.Role.user_id == current_user.id
    ).first()
    
