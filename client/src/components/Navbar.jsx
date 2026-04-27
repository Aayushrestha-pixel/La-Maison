import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo">
          La Maison<span>.</span>
        </NavLink>

        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          <li><NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/menu" onClick={() => setOpen(false)}>Menu</NavLink></li>
          <li><NavLink to="/book" onClick={() => setOpen(false)}>Book a Table</NavLink></li>
          <li><NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink></li>
        </ul>

        <NavLink to="/book" className="btn btn-primary navbar-cta">Reserve Now</NavLink>

        <button className="navbar-burger" onClick={() => setOpen(!open)} aria-label="menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
