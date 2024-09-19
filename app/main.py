from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .router import users, auth, profile, service, booking
from . import models
from .database import engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    # "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
