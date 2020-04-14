const express = require('express')
const router = express.Router()

const {
  getNannies,
  getNannyById,
  createNanny,
} = require('../controllers/nannies')

const { onlyAuthUser } = require('../controllers/users')

router.get('/', getNannies)
router.get('/:id', getNannyById)
router.post('/', onlyAuthUser, createNanny)

module.exports = router
