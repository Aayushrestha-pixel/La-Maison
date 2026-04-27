
const express = require('express')
const router = express.Router()
const controller = require('../controllers/bookings')

router.get('/',      controller.getAll)    // GET /api/bookings
router.post('/',     controller.create)    // POST /api/bookings
router.get('/:id',   controller.getOne)   // GET /api/bookings/:id
router.put('/:id',   controller.replace)  // PUT /api/bookings/:id
router.patch('/:id', controller.update)   // PATCH /api/bookings/:id
router.delete('/:id',controller.remove)   // DELETE /api/bookings/:id

module.exports = router