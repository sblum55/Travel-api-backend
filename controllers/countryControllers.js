const axios = require('axios')
const models = require('../models')

const countryControllers = {}

countryControllers.oneCountry = async (req, res) => {
    try {
        //'country' is pulled into the backend from line 158 in main.js and you need to grab params because it is grabing from url request
        const country = req.params.country
        console.log(country);
        const getCountry = await axios.get(`https://travelbriefing.org/${country}?format=json`)

        console.log(getCountry.data);
        res.json(getCountry.data)

    }catch (error) {
        res.json('country not availble')
    }
}


module.exports = countryControllers