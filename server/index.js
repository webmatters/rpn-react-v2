const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const PORT = process.env.PORT || 3001

const nannies = [
  {
    _id: '12345',
    city: 'Boca',
    name: 'Nasty Nanny',
  },
  {
    _id: '67890',
    city: 'Naples',
    name: 'Apple AuPair',
  },
]

// Middleware
app.use(bodyParser.json())

app.get('/api/v1/nannies', (req, res) => {
  return res.json(nannies)
})

app.get('/api/v1/nannies/:id', (req, res) => {
  const { id } = req.params
  const nanny = nannies.find(nanny => nanny._id === id)
  return res.json(nanny)
})

app.post('/api/v1/nannies', (req, res) => {
  const nannyData = req.body
  nannies.push(nannyData)
  return res.json({ message: `Nanny with id: ${nannyData._id} was added!` })
})

app.delete('/api/v1/nannies/:id', (req, res) => {
  const { id } = req.params
  const index = nannies.findIndex(nanny => nanny._id === id)
  nannies.splice(index, 1)
  return res.json({ message: `Nanny with id: ${id} was deleted` })
})

app.patch('/api/v1/nannies/:id', (req, res) => {
  const { id } = req.params
  const nannyToUpdate = req.body
  const index = nannies.findIndex(nanny => nanny._id === id)

  nannies[index].city = nannyToUpdate.city
  nannies[index].name = nannyToUpdate.name

  return res.json({ message: `Nanny with id: ${id} was updated.` })
})

app.listen(PORT, () => {
  console.log('Server is listening on port: ', PORT)
})
