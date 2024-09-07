from fastapi import FastAPI
from .router import users, auth, profile, service, booking
from . import models
from .database import engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(users.router)
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(service.router)
app.include_router(booking.router)
# app.include_router(profile.router)
# app.include_router(booking.router)
# app.include_router(services.router)


@app.get("/")
def root():
    """root function"""
    return {"message": "Hello craftSpot"}
