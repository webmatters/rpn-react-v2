const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  price: { type: Number, required: true },
  hours: { type: Number, required: true },
  children: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nanny: { type: Schema.Types.ObjectId, ref: 'Nanny', required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Booking', bookingSchema)
