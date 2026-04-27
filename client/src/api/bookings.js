
const BASE = 'http://localhost:8000/api'

export async function createBooking(data) {
  const res = await fetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Booking failed')
  }

  return res.json()
}

export async function getAllBookings() {
  const res = await fetch(`${BASE}/bookings`)
  if (!res.ok) throw new Error('Failed to fetch bookings')
  return res.json()
}

export async function updateBookingStatus(id, status) {
  const res = await fetch(`${BASE}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Update failed')
  return res.json()
}

export async function deleteBooking(id) {
  const res = await fetch(`${BASE}/bookings/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Delete failed')
  return res.json()
}
