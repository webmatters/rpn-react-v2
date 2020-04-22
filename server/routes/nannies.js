const express = require('express')
const router = express.Router()

const {
  getNannies,
  getNannyById,
  createNanny,
  getUserNannies,
  deleteNanny,
} = require('../controllers/nannies')

const { onlyAuthUser } = require('../controllers/users')

router.get('/', getNannies)
router.get('/me', onlyAuthUser, getUserNannies)
router.get('/:id', getNannyById)
router.post('/', onlyAuthUser, createNanny)
router.delete('/:nannyId', onlyAuthUser, deleteNanny)

module.exports = router
