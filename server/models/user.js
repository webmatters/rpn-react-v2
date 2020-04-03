const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
    minlength: [4, 'Must be at least 4 characters.'],
    maxlength: [128, 'Maximum number of characters is 128.'],
  },
  password: {
    type: String,
    required: true,
    minlength: [4, 'Must be at least 4 characters'],
    maxlength: [128, 'Maximum number of characters is 128.'],
  },
})

userSchema.methods.hasSamePassword = function(providedPassword) {
  return bcrypt.compareSync(providedPassword, this.password)
}

userSchema.pre('save', function(next) {
  const user = this

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('User', userSchema)
