const mongoose = require('mongoose')
const { DB_URI } = require('../config/dev')
const FakeDB = require('./FakeDB')

mongoose.connect(
  DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  async () => {
    const fakeDB = new FakeDB()
    console.log('Populating Database')
    await fakeDB.populate()
    await mongoose.connection.close()
    console.log('Database has been populated.')
  }
)
