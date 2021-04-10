const axios = require('axios')
const models = require('../models')

const countryControllers = {}

countryControllers.oneCountry = async (req, res) => {
    try {
        const country = req.body.names.name
        console.log(country);
        const getCountry = await axios.post(`https://travelbriefing.org/${country}?format=json`)

        console.log(getCountry.data);
        res.json(getCountry.data)

    }catch (error) {
        res.json('country not availble')
    }
}


module.exports = countryControllers