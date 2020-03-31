const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { DB_URI } = require('./config/dev')

// Routes
const nannyRoutes = require('./routes/nannies')

const app = express()

const PORT = process.env.PORT || 3001

mongoose.connect(
  DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to RPN Mongo Database')
  }
)

// Middleware
app.use(bodyParser.json())

// API routes
app.use('/api/v1/nannies', nannyRoutes)

app.listen(PORT, () => {
  console.log('Server is listening on port: ', PORT)
})
