const nannies = require('./data/nannies')
const Nanny = require('../models/nanny')

class FakeDB {
  clean() {
    return Nanny.deleteMany({})
  }

  addData() {
    return Nanny.create(nannies)
  }

  async populate() {
    await this.clean()
    await this.addData()
  }
}

module.exports = FakeDB
