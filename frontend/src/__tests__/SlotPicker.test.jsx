import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SlotPicker from '../pages/SlotPicker.jsx'

const slotsByPackage = {
  BASIC: [{ id: 1, slot_date: '2026-09-24', start_time: '09:00', remaining: 4 }],
  PREMIUM: [{ id: 2, slot_date: '2026-09-24', start_time: '11:00', remaining: 1 }],
}

function createMockClient() {
  return {
    getSlots: vi.fn(({ packageCode }) => Promise.resolve(slotsByPackage[packageCode] ?? [])),
  }
}

test('แสดงช่วงเวลาและที่นั่งคงเหลือจาก API จำลอง', async () => {
  const apiClient = createMockClient()
  render(<SlotPicker apiClient={apiClient} />)

  expect(await screen.findByText('09:00 น.')).toBeTruthy()
  expect(screen.getByText('ว่าง 4 ที่')).toBeTruthy()
  expect(apiClient.getSlots).toHaveBeenCalled()
})

test('โหลดช่วงเวลาใหม่เมื่อเปลี่ยนแพ็กเกจ', async () => {
  const apiClient = createMockClient()
  render(<SlotPicker apiClient={apiClient} />)

  await screen.findByText('09:00 น.')
  fireEvent.change(screen.getByLabelText('แพ็กเกจ'), { target: { value: 'PREMIUM' } })

  await waitFor(() => expect(screen.getByText('11:00 น.')).toBeTruthy())
  expect(screen.getByText('ว่าง 1 ที่')).toBeTruthy()
})