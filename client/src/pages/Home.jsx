import { Link } from 'react-router-dom'
import './Home.css'

const features = [
  { icon: '🍷', title: 'Fine Dining', desc: 'Carefully curated dishes prepared with the freshest ingredients.' },
  { icon: '🕯️', title: 'Warm Ambience', desc: 'A cozy and elegant setting perfect for any occasion.' },
  { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Our team brings decades of culinary experience to every plate.' },
  { icon: '📅', title: 'Easy Reservations', desc: 'Book your table online in minutes. No fuss, no waiting.' },
]

function Home() {
  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <p className="hero-sub">Welcome to La Maison</p>
          <h1>Where Every Meal<br />Becomes a Memory</h1>
          <p className="hero-desc">Experience fine dining in the heart of Kathmandu. Fresh ingredients, warm atmosphere, unforgettable taste.</p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-primary">Reserve a Table</Link>
            <Link to="/menu" className="btn btn-outline hero-outline-btn">View Menu</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us</h2>
            <p>A dining experience crafted with care</p>
            <div className="divider"></div>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="cta-strip">
        <div className="container cta-inner">
          <div>
            <h2>Ready for a special evening?</h2>
            <p>Book your table now and we will take care of the rest.</p>
          </div>
          <Link to="/book" className="btn btn-primary">Book a Table</Link>
        </div>
      </section>

    </div>
  )
}

export default Home
