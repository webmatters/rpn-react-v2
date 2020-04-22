const moment = require('moment')

const Nanny = require('../models/nanny')
const Booking = require('../models/booking')

exports.getNannies = async (req, res) => {
  const { city } = req.query

  const query = city ? { city: city.toLowerCase() } : {}

  try {
    const rentals = await Nanny.find(query)
    return res.json(rentals)
  } catch (error) {
    return res.mongoError(error)
  }
}

exports.getUserNannies = async (req, res) => {
  const { user } = res.locals

  try {
    const nannies = await Nanny.find({ owner: user })
    return res.json(nannies)
  } catch (error) {
    return res.mongoError(error)
  }
}

exports.getNannyById = (req, res) => {
  const { id } = req.params

  Nanny.findById(id, (error, foundNanny) => {
    if (error) {
      return res.mongoError(error)
    }
    return res.json(foundNanny)
  })
}

exports.deleteNanny = async (req, res) => {
  const { nannyId } = req.params
  const { user } = res.locals

  try {
    const nanny = await Nanny.findById(nannyId).populate('owner')
    const bookings = await Booking.find({ nanny })

    const hasFutureBookings = bookings.some(
      booking => moment(booking.startAt).diff(moment(), 'days') > 0
    )

    if (user.id !== nanny.owner.id) {
      return res.sendApiError({
        title: 'Invalid User',
        detail: 'You must be the owner of this Nanny to delete it.',
      })
    }

    if (bookings && bookings.length > 0 && hasFutureBookings) {
      return res.sendApiError({
        title: 'Active Bookings',
        detail: 'Cannot delete nanny with active bookings',
      })
    }
    await nanny.remove()
    return res.json({ id: nannyId })
  } catch (error) {
    return res.mongoError(error)
  }
}

exports.createNanny = (req, res) => {
  const nannyData = req.body
  nannyData.owner = res.locals.user

  Nanny.create(nannyData, (error, createdNanny) => {
    if (error) {
      return res.mongoError(error)
    }

    return res.json(createdNanny)
  })
}

// middleware
exports.isUserNanny = (req, res, next) => {
  const { nanny } = req.body
  const user = res.locals.user

  Nanny.findById(nanny)
    .populate('owner', '-password')
    .exec((error, foundNanny) => {
      if (error) {
        return res.mongoError(error)
      }

      if (foundNanny.owner.id === user.id) {
        return res.sendApiError({
          title: 'Invalid User',
          detail: 'Cannot book your own service.',
        })
      }
      next()
    })
}
