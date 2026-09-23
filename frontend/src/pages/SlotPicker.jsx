import { useEffect, useState } from 'react'

const today = new Date()
const formatDate = (date) => date.toISOString().slice(0, 10)
const maxDate = formatDate(new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000))
const initialDate = formatDate(today)

// แสดงช่วงเวลาและที่นั่งคงเหลือตาม FR-BKG-01 และโหลดใหม่ตาม FR-BKG-06
export default function SlotPicker({ apiClient }) {
  const [packageCode, setPackageCode] = useState('BASIC')
  const [dateFrom, setDateFrom] = useState(initialDate)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    apiClient.getSlots({ dateFrom, packageCode }).then((result) => {
      if (active) {
        setSlots(result)
        setLoading(false)
      }
    })

    return () => {
      active = false
    }
  }, [apiClient, dateFrom, packageCode])

  return (
    <section className="min-h-screen bg-slate-950 px-5 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Booking</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">เลือกแพ็กเกจและช่วงเวลา</h1>
        <p className="mt-3 max-w-xl text-slate-300">ดูช่วงเวลาที่ว่างภายใน 30 วันและเลือกเวลาที่เหมาะกับคุณ</p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-200">
            แพ็กเกจ
            <input
              aria-label="แพ็กเกจ"
              className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-base text-white outline-none focus:border-cyan-300"
              value={packageCode}
              onChange={(event) => setPackageCode(event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-200">
            วันที่เริ่มค้นหา
            <input
              aria-label="วันที่เริ่มค้นหา"
              className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-base text-white outline-none focus:border-cyan-300"
              type="date"
              min={initialDate}
              max={maxDate}
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
            />
          </label>
        </div>

        <div className="mt-8" aria-live="polite">
          {loading && <p className="text-slate-300">กำลังค้นหาช่วงเวลาที่ว่าง...</p>}
          {!loading && slots.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-600 p-6 text-slate-300">
              ไม่พบช่วงเวลาที่ว่างสำหรับแพ็กเกจและวันที่เลือก
            </p>
          )}
          {!loading && slots.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {slots.map((slot) => (
                <button
                  type="button"
                  key={slot.id}
                  className="flex items-center justify-between rounded-xl border border-slate-700 bg-white p-4 text-left text-slate-950 transition hover:border-cyan-300"
                >
                  <span>
                    <span className="block text-sm text-slate-500">{slot.slot_date}</span>
                    <span className="mt-1 block text-xl font-semibold">{slot.start_time} น.</span>
                  </span>
                  <span className="text-right text-sm text-slate-600">
                    <span className="block font-semibold text-cyan-700">ว่าง {slot.remaining} ที่</span>
                    <span>เลือกช่วงเวลานี้</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}