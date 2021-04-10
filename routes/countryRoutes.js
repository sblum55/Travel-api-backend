const express = require('express')
const countryControllers = require('../controllers/countryControllers')
const countryRouter = express.Router()

countryRouter.get('/:country', countryControllers.oneCountry)
countryRouter.post('/:savedCountry/:userId', countryControllers.saveCountry)

module.exports = countryRouter