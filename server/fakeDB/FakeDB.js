const { users, nannies } = require('./data')
const Nanny = require('../models/nanny')
const User = require('../models/user')
const Booking = require('../models/booking')

class FakeDB {
  async clean() {
    await Nanny.deleteMany({})
    await User.deleteMany({})
    await Booking.deleteMany({})
  }

  async addData() {
    await Nanny.create(nannies)
    await User.create(users)
  }

  async populate() {
    await this.clean()
    await this.addData()
  }
}

module.exports = FakeDB
