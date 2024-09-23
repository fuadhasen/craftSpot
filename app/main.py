from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.database import engine, get_db
from app.router import users, service, booking
from sqlalchemy.orm import Session


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(service.router)
app.include_router(booking.router)


@app.get("/")
def root(db: Session = Depends(get_db)):
    """root function"""
    users = db.query(models.User).all()
    return users
    # return {"message": "Hello craftSpot"}
