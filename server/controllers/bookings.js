const moment = require('moment')

const Booking = require('../models/booking')

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
