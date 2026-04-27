const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const swaggerUi = require('swagger-ui-express')

const bookingRoutes = require('./routes/bookings')
const menuRoutes = require('./routes/menu')
const chatRoutes = require('./routes/chat')

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const swaggerDoc = yaml.load(fs.readFileSync(path.join(__dirname, 'la-maison-openapi.yaml'), 'utf8'))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use('/api/bookings', bookingRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/chat', chatRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(8000, () => console.log('Server running on port 8000'))
