const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { DB_URI } = require('./config/dev')
const { provideErrorHandler } = require('./middleware')

// Routes
const nannyRoutes = require('./routes/nannies')
const userRoutes = require('./routes/users')

const { onlyAuthUser } = require('./controllers/users')

// Models
require('./models/nanny')
require('./models/user')

const app = express()

const PORT = process.env.PORT || 3001

mongoose.connect(
  DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log('Connected to RPN Mongo Database')
  }
)

// Middleware
app.use(bodyParser.json())
app.use(provideErrorHandler)

app.get('/api/v1/secret', onlyAuthUser, (req, res) => {
  return res.json({ message: 'Super secret message!!' })
})

// API routes
app.use('/api/v1/nannies', nannyRoutes)
app.use('/api/v1/users', userRoutes)

app.listen(PORT, () => {
  console.log('Server is listening on port: ', PORT)
})
