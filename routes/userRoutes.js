const userController = require('../controllers/userControllers')
const express = require('express')
const router = express.Router()

router.post('/', userController.createUser)
router.post('/login', userController.userLogin)

module.exports = router