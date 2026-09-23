// จุดเดียวที่หน้าจอใช้เรียก API หลังบ้าน (ตามสัญญา API ใน plan.md ข้อ 4)
// ตอน test ให้ส่ง client จำลองเข้าไปในหน้าจอแทน ไม่ต้องรันหลังบ้านจริง
// เรียกผ่าน /api (ดู proxy ใน vite.config.js) หลังบ้านต้องรันอยู่ที่ port 8000
const BASE = import.meta.env.VITE_API_BASE ?? '/api'

const mockSlots = [
  { id: 1, slot_date: '2026-09-24', start_time: '09:00', package_code: 'BASIC', remaining: 4 },
  { id: 2, slot_date: '2026-09-24', start_time: '10:00', package_code: 'BASIC', remaining: 2 },
  { id: 3, slot_date: '2026-09-25', start_time: '09:00', package_code: 'BASIC', remaining: 6 },
]

// จำลอง GET /slots สำหรับ FR-BKG-01 และ FR-BKG-06
export const mockApi = {
  async getSlots({ dateFrom, packageCode }) {
    return mockSlots.filter(
      (slot) => slot.slot_date >= dateFrom && slot.package_code === packageCode,
    )
  },
}

export const api = {
  async getSlots({ dateFrom, packageCode }) {
    const q = new URLSearchParams({ date_from: dateFrom, package_code: packageCode })
    const res = await fetch(`${BASE}/slots?${q}`)
    return res.json()
  },
  async createBooking({ slotId }) {
    const res = await fetch(`${BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot_id: slotId }),
    })
    return { status: res.status, body: await res.json() }
  },
}
