const express = require('express')
const router = express.Router()
const { chat } = require('../controllers/chat')

// only one endpoint needed here
router.post('/', chat)

module.exports = router
