from sqlalchemy.engine import Engine

from app.db.models import Base


def upgrade(engine: Engine) -> None:
    """สร้างตารางฐานข้อมูลสำหรับ CON-TECH-01, IF-HIS-01 และ DOM-PDPA-01."""
    Base.metadata.create_all(engine)
