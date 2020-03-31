const express = require('express')
const router = express.Router()

const {
  getNannies,
  getNannyById,
  createNanny,
} = require('../controllers/nannies')

router.get('/', getNannies)
router.get('/:id', getNannyById)
router.post('/', createNanny)

module.exports = router
