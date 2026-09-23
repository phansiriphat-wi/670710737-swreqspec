from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.config import DATABASE_URL


def create_session_factory(database_url: str = DATABASE_URL) -> sessionmaker[Session]:
    engine = create_engine(database_url)
    return sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def create_engine_for_url(database_url: str = DATABASE_URL):
    return create_engine(database_url)
