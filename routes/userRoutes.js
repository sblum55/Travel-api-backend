const userController = require('../controllers/userControllers')
const express = require('express')
const router = express.Router()

router.post('/', userController.createUser)
router.post('/login', userController.userLogin)
router.get('/:userId/savedCounties', userController.getAllCountries)

module.exports = router