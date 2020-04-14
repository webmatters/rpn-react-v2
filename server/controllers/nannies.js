const Nanny = require('../models/nanny')

exports.getNannies = (req, res) => {
  Nanny.find({}, (error, foundNannies) => {
    if (error) {
      return res.mongoError(error)
    }
    return res.json(foundNannies)
  })
}

exports.getNannyById = (req, res) => {
  const { id } = req.params

  Nanny.findById(id, (error, foundNanny) => {
    if (error) {
      return res.mongoError(error)
    }
    return res.json(foundNanny)
  })
}

exports.createNanny = (req, res) => {
  const nannyData = req.body
  nannyData.owner = res.locals.user

  Nanny.create(nannyData, (error, createdNanny) => {
    if (error) {
      return res.mongoError(error)
    }

    return res.json(createdNanny)
  })
}

// middleware
exports.isUserNanny = (req, res, next) => {
  const { nanny } = req.body
  const user = res.locals.user

  Nanny.findById(nanny)
    .populate('owner')
    .exec((error, foundNanny) => {
      if (error) {
        return res.mongoError(error)
      }

      if (foundNanny.owner.id === user.id) {
        return res.sendApiError({
          title: 'Invalid User',
          detail: 'Cannot book your own service.',
        })
      }
      next()
    })
}
