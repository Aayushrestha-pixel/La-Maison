import { useState } from 'react'
import './MenuPage.css'

const menuData = [
  // starters
  { id: 1, category: 'Starters', name: 'Bruschetta al Pomodoro', desc: 'Grilled bread with tomato, garlic, and fresh basil', price: 350, tag: 'Popular' },
  { id: 2, category: 'Starters', name: 'Mushroom Crostini', desc: 'Wild mushrooms on toasted sourdough with herbs', price: 420 },
  { id: 3, category: 'Starters', name: 'French Onion Soup', desc: 'Slow-cooked onion broth with gruyere crouton', price: 480 },

  // mains
  { id: 4, category: 'Mains', name: 'Herb-Crusted Lamb Rack', desc: 'New Zealand lamb with rosemary jus and roasted veg', price: 1850, tag: "Chef's Pick" },
  { id: 5, category: 'Mains', name: 'Pan-Seared Salmon', desc: 'Atlantic salmon, lemon beurre blanc, seasonal greens', price: 1450 },
  { id: 6, category: 'Mains', name: 'Mushroom Risotto', desc: 'Arborio rice, porcini, parmesan, truffle oil', price: 980 },
  { id: 7, category: 'Mains', name: 'Beef Tenderloin', desc: '200g fillet, red wine reduction, dauphinoise potato', price: 2100, tag: 'Popular' },

  // desserts
  { id: 8, category: 'Desserts', name: 'Crème Brûlée', desc: 'Classic vanilla custard with caramelised sugar crust', price: 480 },
  { id: 9, category: 'Desserts', name: 'Chocolate Fondant', desc: 'Warm dark chocolate cake, vanilla ice cream', price: 520, tag: 'Popular' },
  { id: 10, category: 'Desserts', name: 'Tiramisu', desc: 'Espresso-soaked ladyfingers, mascarpone, cocoa', price: 450 },

  // drinks
  { id: 11, category: 'Drinks', name: 'House Red Wine', desc: 'Merlot blend, smooth and full-bodied, glass', price: 650 },
  { id: 12, category: 'Drinks', name: 'Mocktail of the Day', desc: 'Ask your server for today\'s special', price: 280 },
  { id: 13, category: 'Drinks', name: 'Espresso Martini', desc: 'Vodka, espresso, coffee liqueur', price: 750 },
]

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks']

function MenuPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? menuData : menuData.filter(i => i.category === active)

  return (
    <div>
      <div className="page-banner">
        <h1>Our Menu</h1>
        <p>Fresh ingredients, crafted with passion</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="menu-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`menu-tab ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filtered.map(item => (
              <div key={item.id} className="menu-card">
                <div className="menu-card-header">
                  <h3>{item.name}</h3>
                  {item.tag && <span className="menu-tag">{item.tag}</span>}
                </div>
                <p className="menu-desc">{item.desc}</p>
                <div className="menu-footer">
                  <span className="menu-category">{item.category}</span>
                  <span className="menu-price">NPR {item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default MenuPage
