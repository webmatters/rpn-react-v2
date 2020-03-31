const Nanny = require('../models/nanny')

exports.getNannies = (req, res) => {
  Nanny.find({}, (error, foundNannies) => {
    if (error) {
      return Nanny.sendError(res, {
        status: 422,
        detail: 'There was a problem retrieving list of nannies.',
      })
    }
    return res.json(foundNannies)
  })
}

exports.getNannyById = (req, res) => {
  const { id } = req.params

  Nanny.findById(id, (error, foundNanny) => {
    if (error) {
      return Nanny.sendError(res, {
        status: 422,
        detail: 'There was a problem retrieving data for that nanny.',
      })
    }
    return res.json(foundNanny)
  })
}

exports.createNanny = (req, res) => {
  const nannyData = req.body

  Nanny.create(nannyData, (error, createdNanny) => {
    if (error) {
      return Nanny.sendError(res, {
        status: 422,
        detail: 'There was a problem creating a new nanny.',
      })
    }

    return res.json({
      message: `Nanny with id: ${createdNanny._id} was added!`,
    })
  })
}
