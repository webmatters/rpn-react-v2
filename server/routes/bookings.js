const express = require('express')
const router = express.Router()

const { createBooking, getBookings } = require('../controllers/bookings')
const { onlyAuthUser } = require('../controllers/users')
const { isUserNanny } = require('../controllers/nannies')

router.get('', getBookings)
router.post('', onlyAuthUser, isUserNanny, createBooking)

module.exports = router
