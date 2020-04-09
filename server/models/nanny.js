const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nannySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Must be at least 3 characters'],
    maxlength: [128, 'May not exceed 128 characters'],
  },
  city: {
    type: String,
    required: true,
    minlength: [3, 'Must be at least 3 characters'],
    maxlength: [128, 'Maximum number of characters is 128'],
  },
  address1: {
    type: String,
    required: true,
    minlength: [3, 'Must be at least 3 characters'],
    maxlength: [128, 'Maximum number of characters is 128'],
  },
  address2: {
    type: String,
    maxlength: [128, 'Maximum number of characters is 128'],
  },
  state: {
    type: String,
    required: true,
    minlength: [2, 'Must provide 2-character format'],
    maxlength: [2, 'Must provide 2-character format'],
  },
  zip: {
    type: String,
    required: true,
    minlength: [5, 'Must provide at least 5-character format'],
    maxlength: [11, 'Maximum number of characters is 11'],
  },
  phone: {
    type: String,
    required: true,
    minlength: [9, 'Must be at least 9 characters'],
    maxlength: [30, 'Maximum number of characters is 30'],
  },
  image: {
    type: String,
    required: true,
    minlength: [3, 'Must be at least 3 characters'],
  },
  email: {
    type: String,
    required: true,
    minlength: [5, 'Must be at least 5 characters'],
    maxlength: [128, 'Maximum number of characters is 128'],
  },
  headline: {
    type: String,
    required: true,
    minlength: [3, 'Must be at least 3 characters'],
    maxlength: [240, 'May not exceed 240 characters'],
  },
  description: {
    type: String,
    required: true,
    minlength: [3, 'Must be at least 3 characters'],
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  milesRadius: {
    type: Number,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
})

nannySchema.statics.sendError = function (res, config) {
  const { status, detail } = config
  return res.status(status).send({
    errors: [
      {
        title: 'Nanny Error',
        detail,
      },
    ],
  })
}

module.exports = mongoose.model('Nanny', nannySchema)
