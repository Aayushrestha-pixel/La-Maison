import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">La Maison<span>.</span></span>
          <p>Fine dining experience since 1998. Reserve your table and enjoy an unforgettable evening.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/book">Book a Table</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Thamel, Kathmandu, Nepal</p>
          <p>+977 01-4123456</p>
          <p>hello@lamaison.np</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 La Maison. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
