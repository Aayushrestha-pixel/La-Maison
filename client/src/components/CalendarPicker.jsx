import { useState } from 'react'
import './CalendarPicker.css'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function CalendarPicker({ value, onChange }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const selected = value ? new Date(value + 'T00:00:00') : null

  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const selectDay = (day) => {
    const picked = new Date(viewYear, viewMonth, day)
    picked.setHours(0, 0, 0, 0)
    if (picked < today) return // block past dates
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onChange(iso)
    setOpen(false)
  }

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day)
    d.setHours(0, 0, 0, 0)
    return d < today
  }

  const isSelected = (day) => {
    if (!selected) return false
    return selected.getFullYear() === viewYear &&
           selected.getMonth() === viewMonth &&
           selected.getDate() === day
  }

  const isToday = (day) => {
    return today.getFullYear() === viewYear &&
           today.getMonth() === viewMonth &&
           today.getDate() === day
  }

  const displayValue = selected
    ? selected.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
    : 'Select a date'

  return (
    <div className="cal-wrapper">
      <button type="button" className={`cal-trigger ${value ? 'has-value' : ''}`} onClick={() => setOpen(o => !o)}>
        <span className="cal-icon">📅</span>
        <span className="cal-display">{displayValue}</span>
        <span className="cal-arrow">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="cal-dropdown">
          <div className="cal-header">
            <button type="button" className="cal-nav" onClick={prevMonth}>‹</button>
            <span className="cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" className="cal-nav" onClick={nextMonth}>›</button>
          </div>

          <div className="cal-grid">
            {DAYS.map(d => (
              <div key={d} className="cal-day-name">{d}</div>
            ))}

            {/* empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="cal-cell empty"></div>
            ))}

            {/* actual days */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
              <button
                key={day}
                type="button"
                className={`cal-cell ${isPast(day) ? 'past' : ''} ${isSelected(day) ? 'selected' : ''} ${isToday(day) ? 'today' : ''}`}
                onClick={() => selectDay(day)}
                disabled={isPast(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="cal-footer">
            <button type="button" className="cal-today-btn" onClick={() => {
              setViewMonth(today.getMonth())
              setViewYear(today.getFullYear())
            }}>Today</button>
            <button type="button" className="cal-clear-btn" onClick={() => { onChange(''); setOpen(false) }}>Clear</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarPicker
