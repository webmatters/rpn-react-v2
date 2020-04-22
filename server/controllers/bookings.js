const moment = require('moment')

const Booking = require('../models/booking')
const Nanny = require('../models/nanny')

exports.getBookings = async (req, res) => {
  const { nanny } = req.query
  const query = nanny ? Booking.find({ nanny }) : Booking.find({})

  try {
    const bookings = await query.select('startAt endAt -_id').exec()
    return res.json(bookings)
  } catch (error) {
    return res.mongoError(error)
  }
}

exports.getReceivedBookings = async (req, res) => {
  const { user } = res.locals

  try {
    const nannies = await Nanny.find({ owner: user }, '_id')
    const nannyIds = nannies.map(nanny => nanny.id)
    const bookings = await Booking.find({ nanny: { $in: nannyIds } })
      .populate('user', '-password')
      .populate('nanny')
    return res.json(bookings)
  } catch (error) {
    return res.mongoError(error)
  }
}

exports.getUserBookings = async (req, res) => {
  const { user } = res.locals

  try {
    const bookings = await Booking.find({ user })
      .populate('user', '-password')
      .populate('nanny')

    return res.json(bookings)
  } catch (error) {
    return res.mongoError(error)
  }
}

exports.deleteBooking = async (req, res) => {
  const DAYS_THRESHOLD = 1
  const { bookingId } = req.params
  const { user } = res.locals
  try {
    const booking = await Booking.findById(bookingId).populate('user')

    if (user.id !== booking.user.id) {
      return res.sendApiError({
        title: 'Invalid User',
        detail: 'You must be the owner of this booking to delete it.',
      })
    }

    if (moment(booking.startAt).diff(moment(), 'days') > DAYS_THRESHOLD) {
      await booking.remove()
      return res.json({ id: bookingId })
    } else {
      return res.sendApiError({
        title: 'Invalid Booking',
        detail:
          'You cannot delete bookings that are within 1 day of the start date.',
      })
    }
  } catch (error) {
    return res.mongoError(error)
  }
}

exports.createBooking = async (req, res) => {
  const bookingData = req.body
  const booking = new Booking({ ...bookingData, user: res.locals.user })

  if (!isBookingEndAfterStart(booking)) {
    return res.sendApiError({
      title: 'Invalid Booking',
      detail: 'End date must be after start date.',
    })
  }

  try {
    const nannyBookings = await Booking.find({ nanny: booking.nanny })
    const isValid = isBookingValid(booking, nannyBookings)

    if (isValid) {
      const savedBooking = await booking.save()
      return res.json({
        startAt: savedBooking.startAt,
        endAt: savedBooking.endAt,
      })
    } else {
      return res.sendApiError({
        title: 'Invalid Booking',
        detail: 'Chosen dates are already booked.',
      })
    }
  } catch (error) {
    return res.mongoError(error)
  }
}

function isBookingEndAfterStart(booking) {
  let isValid = true

  if (!booking.startAt || !booking.endAt) {
    isValid = false
  }

  if (moment(booking.startAt) > moment(booking.endAt)) {
    isValid = false
  }

  return isValid
}

function isBookingValid(proposedBooking, nannyBookings) {
  let isValid = true

  if (nannyBookings && nannyBookings.length > 0) {
    isValid = nannyBookings.every(existingBooking => {
      const proposedStart = moment(proposedBooking.startAt)
      const proposedEnd = moment(proposedBooking.endAt)

      const existingStart = moment(existingBooking.startAt)
      const existingEnd = moment(existingBooking.endAt)

      return (
        (existingStart < proposedStart && existingEnd < proposedStart) ||
        (proposedEnd < existingEnd && proposedEnd < existingStart)
      )
    })
  }

  return isValid
}
