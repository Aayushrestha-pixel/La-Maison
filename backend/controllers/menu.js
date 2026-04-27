let menuItems = [
  { id: 1, name: 'Bruschetta al Pomodoro', description: 'Grilled bread with tomato, garlic, and fresh basil', price: 350, category: 'Starters', tag: 'Popular', available: true },
  { id: 2, name: 'Mushroom Crostini', description: 'Wild mushrooms on toasted sourdough with herbs', price: 420, category: 'Starters', tag: null, available: true },
  { id: 3, name: 'Herb-Crusted Lamb Rack', description: 'New Zealand lamb with rosemary jus and roasted veg', price: 1850, category: 'Mains', tag: "Chef's Pick", available: true },
  { id: 4, name: 'Pan-Seared Salmon', description: 'Atlantic salmon, lemon beurre blanc, seasonal greens', price: 1450, category: 'Mains', tag: null, available: true },
  { id: 5, name: 'Crème Brûlée', description: 'Classic vanilla custard with caramelised sugar crust', price: 480, category: 'Desserts', tag: null, available: true },
  { id: 6, name: 'House Red Wine', description: 'Merlot blend, smooth and full-bodied, glass', price: 650, category: 'Drinks', tag: null, available: true },
]
let nextId = 7

exports.getAll = (req, res) => {
  let result = [...menuItems]

  if (req.query.category) {
    result = result.filter(i => i.category === req.query.category)
  }

  res.json({ data: result, total: result.length })
}

exports.create = (req, res) => {
  const { name, description, price, category } = req.body

  if (!name || !description || !price || !category) {
    return res.status(400).json({ error: 'Bad Request', message: 'Missing required fields', statusCode: 400 })
  }

  const item = { id: nextId++, ...req.body, available: req.body.available ?? true }
  menuItems.push(item)
  res.status(201).json({ data: item })
}

exports.getOne = (req, res) => {
  const item = menuItems.find(i => i.id === parseInt(req.params.id))
  if (!item) return res.status(404).json({ error: 'Not Found', message: `Menu item ${req.params.id} not found`, statusCode: 404 })
  res.json({ data: item })
}

exports.replace = (req, res) => {
  const idx = menuItems.findIndex(i => i.id === parseInt(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not Found', message: 'Menu item not found', statusCode: 404 })

  menuItems[idx] = { id: menuItems[idx].id, ...req.body }
  res.json({ data: menuItems[idx] })
}

exports.update = (req, res) => {
  const idx = menuItems.findIndex(i => i.id === parseInt(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not Found', message: 'Menu item not found', statusCode: 404 })

  menuItems[idx] = { ...menuItems[idx], ...req.body }
  res.json({ data: menuItems[idx] })
}

exports.remove = (req, res) => {
  const idx = menuItems.findIndex(i => i.id === parseInt(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not Found', message: 'Menu item not found', statusCode: 404 })

  menuItems.splice(idx, 1)
  res.json({ message: 'Deleted successfully', id: parseInt(req.params.id) })
}