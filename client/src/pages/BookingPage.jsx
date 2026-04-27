import { useState } from 'react'
import { createBooking } from '../api/bookings'
import CalendarPicker from '../components/CalendarPicker'
import './BookingPage.css'

// regex validations
const PHONE_REGEX = /^\+?[0-9]{7,10}$/
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/i

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  occasion: '',
  notes: '',
}

const initialErrors = { email: '', phone: '', date: '' }

function BookingPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const validateField = (name, value) => {
    if (name === 'email') {
      if (!value) return 'Email is required'
      if (!EMAIL_REGEX.test(value)) return 'Only Gmail, Yahoo, or Hotmail addresses accepted'
      return ''
    }
    if (name === 'phone') {
      if (!value) return 'Phone is required'
      const digits = value.replace(/\s/g, '')
      if (!PHONE_REGEX.test(digits)) return 'Phone must be 7 to 10 digits'
      return ''
    }
    if (name === 'date') {
      if (!value) return 'Please select a date'
      const picked = new Date(value + 'T00:00:00')
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (picked < today) return 'Cannot book a past date'
      return ''
    }
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleDateChange = (iso) => {
    setForm(prev => ({ ...prev, date: iso }))
    setErrors(prev => ({ ...prev, date: validateField('date', iso) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailErr = validateField('email', form.email)
    const phoneErr = validateField('phone', form.phone)
    const dateErr  = validateField('date', form.date)
    setErrors({ email: emailErr, phone: phoneErr, date: dateErr })
    if (emailErr || phoneErr || dateErr) return

    setStatus('loading')
    setErrorMsg('')
    try {
      await createBooking(form)
      setStatus('success')
      setForm(initialForm)
      setErrors(initialErrors)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div>
        <div className="page-banner">
          <h1>Book a Table</h1>
          <p>Reserve your spot at La Maison</p>
        </div>
        <section className="section">
          <div className="container">
            <div className="booking-success">
              <div className="success-icon">✓</div>
              <h2>Booking Confirmed!</h2>
              <p>We have received your reservation request. Our team will contact you shortly to confirm.</p>
              <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                Make Another Booking
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      <div className="page-banner">
        <h1>Book a Table</h1>
        <p>Reserve your spot at La Maison</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="booking-layout">

            <div className="booking-info">
              <h2>Reservation Details</h2>
              <p>Fill in the form and we will confirm your reservation within 2 hours.</p>
              <div className="info-items">
                <div className="info-item">
                  <span className="info-icon">🕐</span>
                  <div>
                    <strong>Opening Hours</strong>
                    <p>Mon – Sat: 11:00 AM – 10:00 PM</p>
                    <p>Sunday: 12:00 PM – 9:00 PM</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📞</span>
                  <div>
                    <strong>Call Us</strong>
                    <p>+977 01-4123456</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>Thamel, Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="form-error-banner">{errorMsg}</div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email * <span className="field-hint">(Gmail, Yahoo, Hotmail)</span></label>
                  <input type="text" id="email" name="email" value={form.email} onChange={handleChange} placeholder="your@gmail.com" />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone * <span className="field-hint">(7–10 digits)</span></label>
                  <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" maxLength={11} />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="guests">Number of Guests *</label>
                  <select id="guests" name="guests" value={form.guests} onChange={handleChange} required>
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                    <option value="9+">9+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <CalendarPicker value={form.date} onChange={handleDateChange} />
                  {errors.date && <span className="field-error">{errors.date}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time *</label>
                  <select id="time" name="time" value={form.time} onChange={handleChange} required>
                    <option value="">Select time</option>
                    {['11:00','11:30','12:00','12:30','13:00','13:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="occasion">Special Occasion</label>
                <select id="occasion" name="occasion" value={form.occasion} onChange={handleChange}>
                  <option value="">None</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business Dinner</option>
                  <option value="date">Date Night</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Special Requests</label>
                <textarea id="notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Dietary requirements, allergies, seating preferences..." rows={4}></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Confirm Reservation'}
              </button>
            </form>

          </div>
        </div>
      </section>
    </div>
  )
}

export default BookingPage
