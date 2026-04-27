import { useState, useEffect } from 'react'
import { getAllBookings, updateBookingStatus, deleteBooking } from '../api/bookings'
import './Dashboard.css'

// mock data — replace with real API call once backend is ready
const mockBookings = [
  { id: 1, name: 'Aayush Sharma', email: 'aayush@email.com', phone: '9841234567', date: '2025-08-10', time: '19:00', guests: 2, occasion: 'anniversary', status: 'confirmed' },
  { id: 2, name: 'Priya Thapa', email: 'priya@email.com', phone: '9851234567', date: '2025-08-10', time: '20:00', guests: 4, occasion: 'birthday', status: 'pending' },
  { id: 3, name: 'Rajesh KC', email: 'rajesh@email.com', phone: '9861234567', date: '2025-08-11', time: '13:00', guests: 3, occasion: '', status: 'confirmed' },
  { id: 4, name: 'Sita Rai', email: 'sita@email.com', phone: '9871234567', date: '2025-08-11', time: '18:30', guests: 6, occasion: 'business', status: 'cancelled' },
  { id: 5, name: 'Bikash Gurung', email: 'bikash@email.com', phone: '9881234567', date: '2025-08-12', time: '20:30', guests: 2, occasion: 'date', status: 'pending' },
]

function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      // swap this out when your backend is live:
      // const data = await getAllBookings()
      // setBookings(data)

      // using mock data for now
      await new Promise(r => setTimeout(r, 600)) // fake loading delay
      setBookings(mockBookings)
    } catch (err) {
      console.error('failed to fetch bookings', err)
      setBookings(mockBookings) // fallback
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    // optimistic update
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b))

    try {
      // await updateBookingStatus(id, newStatus) // uncomment when backend is ready
    } catch (err) {
      console.error('status update failed', err)
      fetchBookings() // revert on failure
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this booking?')) return
    setBookings(prev => prev.filter(b => b.id !== id))

    try {
      // await deleteBooking(id) // uncomment when backend is ready
    } catch (err) {
      console.error('delete failed', err)
      fetchBookings()
    }
  }

  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter.toLowerCase())

  const counts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  return (
    <div>
      <div className="page-banner">
        <h1>Reservations Dashboard</h1>
        <p>Manage all table bookings</p>
      </div>

      <section className="section">
        <div className="container">

          {/* summary cards */}
          <div className="dash-stats">
            <div className="stat-card">
              <span className="stat-num">{counts.all}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-card confirmed">
              <span className="stat-num">{counts.confirmed}</span>
              <span className="stat-label">Confirmed</span>
            </div>
            <div className="stat-card pending">
              <span className="stat-num">{counts.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card cancelled">
              <span className="stat-num">{counts.cancelled}</span>
              <span className="stat-label">Cancelled</span>
            </div>
          </div>

          {/* filter tabs */}
          <div className="dash-filters">
            {['All', 'Confirmed', 'Pending', 'Cancelled'].map(f => (
              <button
                key={f}
                className={`dash-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
            <button className="btn btn-outline refresh-btn" onClick={fetchBookings}>
              Refresh
            </button>
          </div>

          {/* table */}
          {loading ? (
            <div className="dash-loading">Loading bookings...</div>
          ) : filtered.length === 0 ? (
            <div className="dash-empty">No bookings found.</div>
          ) : (
            <div className="table-wrapper">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Date & Time</th>
                    <th>Guests</th>
                    <th>Occasion</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => (
                    <tr key={b.id}>
                      <td>
                        <strong>{b.name}</strong>
                      </td>
                      <td>
                        <div className="contact-cell">
                          <span>{b.email}</span>
                          <span>{b.phone}</span>
                        </div>
                      </td>
                      <td>
                        <div className="date-cell">
                          <span>{b.date}</span>
                          <span>{b.time}</span>
                        </div>
                      </td>
                      <td>{b.guests}</td>
                      <td>{b.occasion || '—'}</td>
                      <td>
                        <span className={`badge badge-${b.status}`}>
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          {b.status !== 'confirmed' && (
                            <button
                              className="action-btn confirm"
                              onClick={() => handleStatusChange(b.id, 'confirmed')}
                              title="Confirm"
                            >✓</button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button
                              className="action-btn cancel"
                              onClick={() => handleStatusChange(b.id, 'cancelled')}
                              title="Cancel"
                            >✕</button>
                          )}
                          <button
                            className="action-btn delete"
                            onClick={() => handleDelete(b.id)}
                            title="Delete"
                          >🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </section>
    </div>
  )
}

export default Dashboard
