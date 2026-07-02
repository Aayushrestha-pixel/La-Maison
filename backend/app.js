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

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://concproject-alb-1190008323.ap-south-1.elb.amazonaws.com'
}))
app.use(express.json())

const swaggerDoc = yaml.load(fs.readFileSync(path.join(__dirname, 'la-maison-openapi.yaml'), 'utf8'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

const api = express.Router()
api.use('/bookings', bookingRoutes)
api.use('/menu', menuRoutes)
api.use('/chat', chatRoutes)
api.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/aayush', api)

app.get('/', (req, res) => res.sendStatus(200))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
