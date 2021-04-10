const axios = require('axios')
const models = require('../models')

const countryControllers = {}

countryControllers.oneCountry = async (req, res) => {
    try {
        //'country' is pulled into the backend from line 158 in main.js and you need to grab params because it is grabing from url request
        const country = req.params.country
        console.log(country);
        const getCountry = await axios.get(`https://travelbriefing.org/${country}?format=json`)

        // console.log(getCountry.data);
        res.json(getCountry.data)

    }catch (error) {
        res.json('country not availble')
    }
}

countryControllers.saveCountry = async (req, res) => {
    try{
        const savedCountry = await models.country.findOrCreate ({
            where: {
                name: req.params.name
            }
        })
        
        let findUser = await models.userfindOne ({
            where: {
                id: req.params.id
            }
        })

        const addCountry = await findUser.addCountry(savedCountry[0])
        res.json({addCountry, findUser, savedCountry})

    }catch (error){
        console.log(error);
        res.json({error})
    }

}


module.exports = countryControllers