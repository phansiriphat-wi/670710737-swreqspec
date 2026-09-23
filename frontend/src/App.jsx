import SlotPicker from './pages/SlotPicker.jsx'
import { api, mockApi } from './api/client.js'

export default function App() {
  return <SlotPicker apiClient={import.meta.env.MODE === 'test' ? mockApi : api} />
}
