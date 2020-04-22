const express = require('express')
const router = express.Router()

const {
  createBooking,
  getBookings,
  getUserBookings,
  getReceivedBookings,
  deleteBooking,
} = require('../controllers/bookings')
const { onlyAuthUser } = require('../controllers/users')
const { isUserNanny } = require('../controllers/nannies')

router.get('', getBookings)
router.get('/received', onlyAuthUser, getReceivedBookings)
router.get('/me', onlyAuthUser, getUserBookings)
router.post('', onlyAuthUser, isUserNanny, createBooking)

router.delete('/:bookingId', onlyAuthUser, deleteBooking)

module.exports = router
