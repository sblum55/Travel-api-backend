const express = require('express')
const countryControllers = require('../controllers/countryControllers')
const countryRouter = express.Router()

countryRouter.post('/:countryName', countryControllers.oneCountry)


module.exports = countryRouter