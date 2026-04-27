let bookings = [] // swap this with a real DB later
let nextId = 1

exports.getAll = (req, res) => {
  let result = [...bookings]

  if (req.query.status) {
    result = result.filter(b => b.status === req.query.status)
  }
  if (req.query.date) {
    result = result.filter(b => b.date === req.query.date)
  }

  res.json({ data: result, total: result.length, page: 1, limit: 20 })
}

exports.create = (req, res) => {
  const { name, email, phone, date, time, guests } = req.body

  if (!name || !email || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'Bad Request', message: 'Missing required fields', statusCode: 400 })
  }

  const booking = { id: nextId++, ...req.body, status: 'pending', createdAt: new Date().toISOString() }
  bookings.push(booking)
  res.status(201).json({ data: booking })
}

exports.getOne = (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id))
  if (!booking) return res.status(404).json({ error: 'Not Found', message: `Booking ${req.params.id} not found`, statusCode: 404 })
  res.json({ data: booking })
}

exports.replace = (req, res) => {
  const idx = bookings.findIndex(b => b.id === parseInt(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not Found', message: 'Booking not found', statusCode: 404 })

  bookings[idx] = { id: bookings[idx].id, ...req.body, createdAt: bookings[idx].createdAt }
  res.json({ data: bookings[idx] })
}

exports.update = (req, res) => {
  const idx = bookings.findIndex(b => b.id === parseInt(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not Found', message: 'Booking not found', statusCode: 404 })

  bookings[idx] = { ...bookings[idx], ...req.body }
  res.json({ data: bookings[idx] })
}

exports.remove = (req, res) => {
  const idx = bookings.findIndex(b => b.id === parseInt(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not Found', message: 'Booking not found', statusCode: 404 })

  bookings.splice(idx, 1)
  res.json({ message: 'Deleted successfully', id: parseInt(req.params.id) })
}