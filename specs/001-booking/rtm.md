# RTM: จองคิวตรวจสุขภาพ (Booking)
อ้างอิง: spec.md Draft v2 | tasks.md | test-cases.md
สร้างด้วย /verify เมื่อ 2569-10-07 08:41 | test: backend 6 ผ่าน 0 ไม่ผ่าน; frontend 1 ผ่าน 0 ไม่ผ่าน

## 1. ตามรอยไปข้างหน้า (requirement ไป โค้ด ไป test)
| ID | AC | task | โค้ด (ไฟล์: ฟังก์ชัน) | test (ผล) | สถานะ |
|---|---|---|---|---|---|
| FR-BKG-01 | AC-BKG-05 | T-02 (เสร็จ) | backend/app/slots/router.py:get_slots; backend/app/slots/service.py:list_available_slots | backend/tests/test_AC_BKG_05.py::test_AC_BKG_05 (ผ่าน; ช่วงวันที่ผิดตาม spec) | ช่องโหว่ |
| FR-BKG-02 | AC-BKG-02 | T-04 (พร้อมทำ) | backend/app/booking/service.py:create_booking ยังไม่มีการตรวจคิวเดิมรายวัน | ไม่มี test ของ AC-BKG-02 | ยังไม่ถึง |
| FR-BKG-03 | AC-BKG-03 | T-05 (พร้อมทำ) | ยังไม่มี logic เสนอช่วงใกล้เคียง | ไม่มี test ของ AC-BKG-03 | ยังไม่ถึง |
| FR-BKG-04 | AC-BKG-01 | T-03 (เสร็จ), T-06 (รอ Q-02) | backend/app/booking/router.py:create_booking; backend/app/booking/service.py:create_booking, next_queue_no; frontend/src/App.jsx:App ยังเป็น placeholder | backend/tests/test_AC_BKG_01.py::test_TC_BKG_01_1_booking_success, test_TC_BKG_01_2_last_seat_booking (ผ่าน); ยังไม่มี test ตรวจการแสดงหมายเลขบนหน้าจอ | ช่องโหว่ |
| FR-BKG-05 | AC-BKG-04 | T-07 (พร้อมทำ) | ยังไม่มีคิวแจ้งเตือนหรือ retry | ไม่มี test ของ AC-BKG-04 | ยังไม่ถึง |
| FR-BKG-06 | ไม่มี AC | T-02 (API package filter), T-10 (พร้อมทำ) | backend/app/slots/service.py:list_available_slots กรอง package_code; ไม่มี UI เปลี่ยนแพ็กเกจและคำนวณใหม่ | ไม่มี test ของ FR-BKG-06 | ช่องโหว่ |
| NFR-PERF-01 | AC-BKG-05 | T-02 (เสร็จ) | backend/app/slots/router.py:get_slots; backend/app/slots/service.py:list_available_slots | backend/tests/test_AC_BKG_05.py::test_AC_BKG_05 (ผ่าน แต่ทดสอบ 200 คำขอเรียงลำดับ ไม่ใช่ผู้ใช้พร้อมกัน) | ช่องโหว่ |
| NFR-SEC-01 | ไม่มี AC | ไม่มี task | ไม่มีการตั้งค่า TLS/HTTPS ใน backend/app/ หรือ frontend/src/ | ไม่มี test ที่ตรวจ TLS | ยังไม่ถึง |
| NFR-REL-02 | AC-BKG-04 | T-07 (พร้อมทำ) | ยังไม่มี logic retry | ไม่มี test ของ AC-BKG-04 | ยังไม่ถึง |
| NFR-USE-01 | ไม่มี AC | ไม่มี task | ยังไม่มี UI flow หรือผลทดสอบผู้ใช้ใหม่ | ไม่มี test usability | ยังไม่ถึง |
| CON-TECH-01 | ไม่มี AC | T-01 (เสร็จ) | backend/app/config.py:DATABASE_URL; backend/app/db/session.py:engine รองรับค่าจาก environment แต่ default เป็น SQLite | backend/tests/test_T01_schema.py::test_T01_tables_created, test_T01_no_national_id (ผ่าน; ใช้ SQLite) | ช่องโหว่ |
| DOM-PDPA-01 | AC-BKG-06 | T-08 (พร้อมทำ) | backend/app/db/models.py:AuditLog มี schema แต่ยังไม่มีการเขียน log | ไม่มี test ของ AC-BKG-06 | ยังไม่ถึง |
| IF-IDP-01 | AC-BKG-01 | T-03 (เสร็จ) | backend/app/auth/idp.py:get_verified_hn ตรวจเพียง prefix token จำลอง ไม่ตรวจผลจาก IdP จริง | backend/tests/test_AC_BKG_01.py::test_TC_BKG_01_3_unverified_user_rejected (ผ่านเฉพาะกรณีไม่มี token) | ช่องโหว่ |
| IF-HIS-01 | ไม่มี AC | T-01 (เสร็จ), T-09 (พร้อมทำ) | backend/app/booking/router.py:BookingRequest รับ national_id และ create_booking log ค่าดังกล่าว; ยังไม่มีการ lookup HIS | backend/tests/test_T01_schema.py::test_T01_no_national_id (ผ่านเฉพาะการไม่มี column ใน bookings) | ช่องโหว่ |
| IF-NOT-01 | AC-BKG-04 | T-07 (พร้อมทำ) | ยังไม่มีการวางข้อความลงคิวแบบ asynchronous | ไม่มี test ของ AC-BKG-04 | ยังไม่ถึง |

## 2. ตามรอยย้อนกลับ (โค้ด ไป requirement)
| โค้ด (ไฟล์: ฟังก์ชัน หรือ endpoint) | อ้าง ID | ตรงกับข้อความใน spec ไหม | หมายเหตุ |
|---|---|---|---|
| backend/app/slots/router.py:GET /slots | FR-BKG-01, FR-BKG-06 | บางส่วน | คืน slot_date, start_time และ remaining และกรอง package_code; service จำกัดช่วงค้นหา 14 วัน ไม่ใช่ 30 วัน และยังไม่มีหน้าจอเปลี่ยนแพ็กเกจ |
| backend/app/slots/service.py:list_available_slots | FR-BKG-01, FR-BKG-06 | ไม่ตรงทั้งหมด | กรองที่นั่งคงเหลือและ package_code แต่ DAYS_AHEAD = 14 ขัดกับช่วง 30 วัน |
| backend/app/booking/router.py:POST /bookings | FR-BKG-04, IF-IDP-01, IF-HIS-01 | ไม่ตรงทั้งหมด | ใช้ dependency auth จำลอง; request มี national_id ที่ API contract ไม่ระบุ และ log ค่า national_id ทั้งที่ยังไม่ได้ใช้ lookup HIS |
| backend/app/booking/service.py:create_booking | FR-BKG-04 | ตรงบางส่วน | ตรวจที่นั่ง > 0, ลดที่นั่งและบันทึก booking; ยังมีการเรียก next_queue_no ที่เลือกรูปแบบคิวทั้งที่ Q-02 ยังเปิด |
| backend/app/booking/service.py:next_queue_no | FR-BKG-04, Q-02 | ไม่ตรง | เลือกรูปแบบ A001 และรีเซ็ตรายวันจากตัวอย่างในคำถาม Q-02 โดยไม่มีคำตอบจากทีม |
| backend/app/auth/idp.py:get_verified_hn | IF-IDP-01 | ไม่ตรง | ตรวจเพียง prefix ของ Authorization แบบจำลอง ไม่ได้รับ/ตรวจผลยืนยันจากระบบ IdP จริง |
| backend/app/config.py:DATABASE_URL; backend/app/db/session.py:engine | CON-TECH-01 | ยังยืนยันไม่ได้ | รับ DATABASE_URL ใดก็ได้และใช้ SQLite เป็นค่าเริ่มต้น; ไม่มี guard ยืนยัน PostgreSQL สำหรับ runtime จริง |
| backend/app/db/migrations/001_init.py:upgrade; backend/app/main.py:lifespan | CON-TECH-01, DOM-PDPA-01 | บางส่วน | สร้าง schema ได้ รวม audit_logs แต่ไม่มีการเขียน audit log; startup เรียก create_all |
| backend/app/db/models.py:Booking | FR-BKG-04, IF-HIS-01 | ตรงบางส่วน | bookings เก็บ HN และไม่มีคอลัมน์ national_id; queue_no อนุญาต null ตาม Q-02 |
| frontend/src/api/client.js:api.getSlots, api.createBooking | FR-BKG-01, FR-BKG-03, FR-BKG-04 | ยังไม่ครบ | มี client เรียก GET/POST แต่ไม่มีหน้าจอที่ใช้ client และ request booking ไม่ส่งผลยืนยันตัวตน |
| frontend/src/App.jsx:App | FR-BKG-01, FR-BKG-03, FR-BKG-04, FR-BKG-05 | ไม่ตรง | แสดง placeholder เท่านั้น ยังไม่มี flow จองหรือแสดงผล booking |
| backend/app/db/session.py:get_db | CON-TECH-01 | ตรงบางส่วน | จัดการ session ผ่าน engine ที่สร้างจาก DATABASE_URL; ไม่ยืนยันชนิดฐานข้อมูล |
| backend/app/main.py:lifespan, app | CON-TECH-01 | ตรงบางส่วน | สร้างตารางและรวม router; ไม่มี TLS config หรือ audit middleware |

ไม่มี endpoint หรือฟังก์ชันยกเลิก/เลื่อนคิวหลงเหลือในโค้ดที่ตรวจ; การยกเลิก/เลื่อนเป็น Out of scope (UC-02).

## 3. ข้อค้นพบ
ชนิด: AC ไม่มี test / test อ่อน / โค้ดไม่มี FR / FR ไม่มี AC / เดา Q-xx / ละเมิด Constraint / ตัวเลขไม่ตรง spec / อ้าง ID ผิดเรื่อง
ทีมตัดสิน: แก้โค้ด / แก้ spec / เพิ่ม Q-xx / ไม่ใช่ปัญหา (พร้อมเหตุผล 1 บรรทัด)

| F-ID | ชนิด | อยู่ที่ | ขัดกับ | รายละเอียด | ทีมตัดสิน |
|---|---|---|---|---|---|
| F-001 | ตัวเลขไม่ตรง spec | backend/app/slots/service.py:list_available_slots | FR-BKG-01 | กำหนด DAYS_AHEAD = 14 แต่ spec กำหนดให้แสดงช่วงเวลาภายใน 30 วันข้างหน้า |  |
| F-006 | FR ไม่มี AC | specs/001-booking/spec.md:FR-BKG-06 | FR-BKG-06 | Requirement เปลี่ยนแพ็กเกจและคำนวณช่วงเวลาว่างใหม่ไม่มี AC; spec ยังระบุใน plan ว่าควรเสนอทีมเพิ่ม AC |  |
| F-007 | test อ่อน | backend/tests/test_AC_BKG_05.py:test_AC_BKG_05 | NFR-PERF-01 / AC-BKG-05 | วัด 200 คำขอ sequential ไม่ได้จำลองผู้ใช้พร้อมกัน 200 คนตาม AC จึงยังยืนยัน p95 ภายใต้ concurrency ไม่ได้ |  |
| F-008 | เดา Q-xx | backend/app/booking/service.py:next_queue_no | Q-02 / FR-BKG-04 | กำหนดรูปแบบ A001 และการเริ่มนับใหม่รายวัน ทั้งที่ Q-02 ยังไม่มีคำตอบ; A001 เป็นเพียงตัวอย่างในคำถาม |  |
| F-009 | ละเมิด Constraint | backend/app/auth/idp.py:get_verified_hn | IF-IDP-01 | ตรวจเพียงว่าค่า Authorization ขึ้นต้นด้วย prefix คงที่ ไม่ได้ตรวจผลยืนยันตัวตนจากระบบ IdP ตาม constraint |  |
| F-010 | ละเมิด Constraint | backend/app/booking/router.py:BookingRequest, create_booking | IF-HIS-01 | รับ national_id ใน request และเขียนลง application log โดยตรง ทั้งยังไม่ได้ส่งต่อ HIS; เป็นข้อมูลที่ไม่จำเป็นต้อง log และไม่ตรงกับ API contract ที่ระบุ input เป็น slot_id |  |
| F-011 | ละเมิด Constraint | backend/app/config.py:DATABASE_URL; backend/app/db/session.py:engine | CON-TECH-01 | runtime ใช้ SQLite ได้จากค่า default และ DATABASE_URL ไม่ถูกตรวจให้เป็น PostgreSQL; test ปัจจุบันก็ใช้ SQLite จึงยังไม่มีหลักฐานยืนยันการใช้ PostgreSQL ใน runtime จริง |  |

ข้อค้นพบจาก RTM รอบก่อนที่ไม่นับเป็นข้อค้นพบรอบนี้: F-002 ย้ายไป “แก้แล้ว”; F-003, F-004 และ F-005 ไม่คงไว้ เพราะ task T-08, T-09 และ T-04 ยังไม่เริ่มทำตามเกณฑ์ /verify ว่างานที่ยังไม่ถึงให้ระบุสถานะ “ยังไม่ถึง” แทน

## 4. แก้แล้ว
| F-ID | แก้อย่างไร | รู้ได้อย่างไร |
|---|---|---|
| F-002 | ปรับปรุง test ของกรณีที่นั่งสุดท้ายให้ตรวจผลการจองครั้งถัดไปและจำนวนที่นั่งคงเหลือ | test_TC_BKG_01_2_last_seat_booking ตรวจ response 409 ของคำขอถัดไป และตรวจ slot.remaining == 0; ผ่านในการรันล่าสุด |
