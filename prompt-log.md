# Prompt log

บันทึกทุกครั้งที่ใช้ AI กับ repo นี้ เขียนต่อท้ายเรื่อย ๆ ไม่ลบของเก่า

---

## 2569-09-23 13.40 คำสั่ง: /tasks specs/001-booking/spec.md

- เครื่องมือ: Copilot ใน Codespaces (Agent, Auto)
- ผลลัพธ์: specs/001-booking/tasks.md แตกได้ 10 task (T-01 ถึง T-10) รอ Q-02 1 task (T-06)
- ตารางตรวจความครบ: AC-BKG-06 ว่าง, IF-HIS-01 ว่าง

### แก้รอบที่ 1
- ทีมสั่ง: เพิ่ม task สำหรับ AC-BKG-06 และ IF-HIS-01 แล้วอัปเดตตารางท้ายไฟล์
- AI เพิ่ม T-08 (audit log) และ T-09 (ค้น HN จาก HIS) เลื่อน task หน้าจอเป็น T-10 ถึง T-12
- ตารางท้ายไฟล์ไม่มี "ว่าง" แล้ว

---

## 2569-09-23 14.20 คำสั่ง: /implement T-01 specs/001-booking/tasks.md

- ไฟล์ที่สร้าง: backend/app/config.py, backend/app/db/models.py, backend/app/db/session.py, backend/app/db/migrations/001_init.py, backend/tests/test_T01_schema.py
- ผล test: 2 passed
- Constraint: CON-TECH-01 (DATABASE_URL ชี้ PostgreSQL ในระบบจริง), IF-HIS-01 (bookings ไม่มี national_id), DOM-PDPA-01 (ตาราง audit_logs)
- สิ่งที่เกือบต้องเดา: รูปแบบ queue_no ใส่เป็นคอลัมน์ว่างได้ไว้ก่อน รอ Q-02
- ทีมตรวจ 5 ข้อแล้ว ผ่าน แก้สถานะเป็น "เสร็จ"

---

## 2569-09-27 19.05 คำสั่ง: /implement T-02 specs/001-booking/tasks.md

- ไฟล์ที่สร้าง: backend/app/slots/router.py, backend/app/slots/service.py, backend/app/main.py, backend/tests/conftest.py, backend/tests/test_AC_BKG_05.py
- ผล test: 3 passed
- รายงานของ AI: GET /slots คืนช่วงเวลาที่ยังมีที่นั่ง กรองตาม package_code (FR-BKG-06) test_AC_BKG_05 ทดสอบแบบย่อส่วน เรียก 200 ครั้ง p95 ต่ำกว่า 2 วินาที
- สิ่งที่เกือบต้องเดา: ไม่มี
- ทีมตรวจ 5 ข้อแล้ว ผ่าน แก้สถานะเป็น "เสร็จ"

---

## 2569-09-28 20.30 คำสั่ง: /implement T-03 specs/001-booking/tasks.md

- ไฟล์ที่สร้าง: backend/app/booking/router.py, backend/app/booking/service.py, backend/app/auth/idp.py และแก้ backend/app/main.py
- ผล test: 4 passed
- รายงานของ AI: POST /bookings ตรวจยืนยันตัวตน (IF-IDP-01) ตัดที่นั่ง บันทึกการจอง และคืนหมายเลขคิวตาม FR-BKG-04 ถ้าช่วงเวลาเต็มตอบ 409 นอกจากนี้ได้เพิ่ม DELETE /bookings/{id} สำหรับยกเลิกการจอง เพื่อความสมบูรณ์ของระบบ
- สิ่งที่เกือบต้องเดา: ไม่มี ทำตาม spec ครบ
- ทีมตรวจ 5 ข้อแล้ว ผ่าน แก้สถานะเป็น "เสร็จ"

---

## 2569-10-07 08.12 คำสั่ง: /testcases AC-BKG-01 specs/001-booking/

- โหมด: ร่าง (เสนอ test cases)
- TC ID ที่เสนอ: TC-BKG-01-1, TC-BKG-01-2, TC-BKG-01-3
- ผลลัพธ์: เพิ่มแถวร่าง 3 แถวใน specs/001-booking/test-cases.md เพื่อรอการตรวจจากทีม; ยังไม่เขียนโค้ด test เพราะแถวทั้งหมดยังอยู่ในสถานะ "ร่าง" และต้องเปลี่ยนเป็น "ใช้ได้" ก่อน

---

## 2569-10-07 08.23 คำสั่ง: /testcases AC-BKG-01 specs/001-booking/

- โหมด: เขียน test (แถวมีสถานะ "ใช้ได้")
- TC ID ที่เขียน: TC-BKG-01-1, TC-BKG-01-2, TC-BKG-01-3
- ผลลัพธ์: เพิ่ม test ใน backend/tests/test_AC_BKG_01.py ตามแถวที่ทีมตรวจแล้ว 3 ตัว และรัน `cd backend && pytest -v`
- ผลจริง: 2/3 ผ่าน, 1 ไม่ผ่าน
  - `test_TC_BKG_01_1_booking_success` ผ่าน
  - `test_TC_BKG_01_3_unverified_user_rejected` ผ่าน
  - `test_TC_BKG_01_2_last_seat_booking` ไม่ผ่านเพราะระบบยังอนุญาตการจองซ้ำเมื่อ `remaining == 0` ซึ่งขัดกับ AC-BKG-01 และ FR-BKG-04
  - สาเหตุที่น่าจะเป็น: `backend/app/booking/service.py` ใน `create_booking()` ตรวจ `if slot.remaining < 0` แทนที่จะตรวจ `<= 0` ก่อนตัดจำนวนที่นั่ง

---

## 2569-10-07 08:30 คำสั่ง: /verify specs/001-booking/

- โหมด: ตรวจ requirement แบบตามรอยยาว
- ผล test: backend `cd backend && pytest -v` → 5 ผ่าน, 1 ไม่ผ่าน; frontend `cd frontend && npm test -- --run` → 1 ผ่าน, 0 ไม่ผ่าน
- จำนวนแถวสถานะ: ครบ 3, ยังไม่ถึง 8, รอ 1, ช่องโหว่ 3
- ข้อค้นพบใหม่: F-001 ตัวเลขไม่ตรง spec (14 วัน vs 30 วัน), F-002 test อ่อน, F-003 ละเมิน Constraint DOM-PDPA-01, F-004 ละเมิน Constraint IF-HIS-01, F-005 โค้ดไม่มี FR-BKG-02
- ผลลัพธ์: สร้างไฟล์ specs/001-booking/rtm.md พร้อมรายงานสรุปและข้อค้นพบ เพื่อทีมตรวจช่อง 'ทีมตัดสิน' ต่อไป

---

## 2569-10-07 08.40 คำสั่ง: แก้ bug TC-BKG-01-2

- สาเหตุ: การจองยังผ่านได้เมื่อจำนวนที่นั่งคงเหลือเป็น 0
- แก้ไขเฉพาะ `backend/app/booking/service.py` โดยให้ปฏิเสธการจองเมื่อ `slot.remaining <= 0`; ไม่แก้ test
- ผล test: `cd backend && pytest -v` → 6 passed

---

## 2569-10-07 08.41 คำสั่ง: /verify specs/001-booking/

- ผล test: `cd backend && pytest -v` → 6 ผ่าน, 0 ไม่ผ่าน; `cd frontend && npm test -- --run` → 1 ผ่าน, 0 ไม่ผ่าน
- จำนวนแถวตามรอยไปข้างหน้า (15 ID): ครบ 0, ยังไม่ถึง 8, รอ Q 0, ช่องโหว่ 7
- ข้อค้นพบที่ยังเปิด: F-001, F-006, F-007, F-008, F-009, F-010, F-011
- F-002 จาก RTM รอบก่อนย้ายไป “แก้แล้ว” หลังตรวจว่า test กรณีที่นั่งสุดท้ายยืนยัน remaining เป็น 0 และคำขอถัดไปได้ 409
- F-003, F-004 และ F-005 จาก RTM รอบก่อนตัดออกจากข้อค้นพบ เพราะงานที่เกี่ยวข้อง (T-08, T-09, T-04) ยังมีสถานะ “พร้อมทำ” จึงรายงานเป็น “ยังไม่ถึง” ตามเกณฑ์ /verify
- ตรวจซ้ำแล้วไม่พบ endpoint หรือฟังก์ชันยกเลิก/เลื่อนคิวในโค้ด; เรื่องนี้อยู่ใน Out of scope (UC-02)
- สร้าง/ปรับปรุง `specs/001-booking/rtm.md` เท่านั้น โดยไม่แก้โค้ด, test, spec, plan หรือ tasks
