# AC-BKG-01 (FR-BKG-04)
from app.db.models import Booking
from tests.conftest import AUTH


def test_TC_BKG_01_1_booking_success(client, make_slot, db):
    # Given
    slot = make_slot(start="09:00", remaining=1)

    # When
    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    # Then
    assert res.status_code == 201
    payload = res.json()
    assert payload["slot_id"] == slot.id
    assert payload["queue_no"]
    assert db.query(Booking).count() == 1
    db.refresh(slot)
    assert slot.remaining == 0


def test_TC_BKG_01_2_last_seat_booking(client, make_slot, db):
    # Given
    slot = make_slot(start="09:00", remaining=1, capacity=1)

    # When
    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)
    second_res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    # Then
    assert res.status_code == 201
    assert res.json()["queue_no"]
    assert second_res.status_code == 409
    assert second_res.json()["detail"] == "ช่วงเวลาเต็ม"
    db.refresh(slot)
    assert slot.remaining == 0


def test_TC_BKG_01_3_unverified_user_rejected(client, make_slot, db):
    # Given
    slot = make_slot(start="09:00", remaining=1)

    # When
    res = client.post("/bookings", json={"slot_id": slot.id}, headers={})

    # Then
    assert res.status_code == 401
    assert res.json()["detail"] == "ยังไม่ได้ยืนยันตัวตน"
    assert db.query(Booking).count() == 0
    db.refresh(slot)
    assert slot.remaining == 1
