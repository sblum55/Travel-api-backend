const axios = require('axios')
const models = require('../models')
const country = require('../models/country')

const countryControllers = {}

countryControllers.oneCountry = async (req, res) => {
    try {
        //'country' is pulled into the backend from line 158 in main.js and you need to grab params because it is grabing from url request
        const country = req.params.country
        console.log(country);
        const getCountry = await axios.get(`https://travelbriefing.org/${country}?format=json`)
        res.json(getCountry.data)

    }catch (error) {
        res.json('country not availble')
    }
}


countryControllers.savedCountry = async (req, res) => {
    try{
        const savedCountry = await models.country.findOrCreate ({
            where: {
                name: req.body.data.names.name
            },
            defaults: {
                language: req.body.data.language[0].language,
                currency: req.body.data.currency.name
                
            }
        })

        //created empty array and looped thru vaccination data to get vaccines and create to table
        let vaccineArr = []
        for(let i = 0; i < req.body.data.vaccinations.length; i++) {
            vaccineArr.push (await models.vaccine.create ({
                    name: req.body.data.vaccinations[i].name,
                    message: req.body.data.vaccinations[i].message

            }))
        }
        
        let findUser = await models.user.findOne ({
            where: {
                id: req.params.userId,
            
            }
        })

        const addCountry = await findUser.addCountries(savedCountry[0])
        // looped through array again to contact to corresponding country
        for (let i = 0; i < vaccineArr.length; i++) {
            savedCountry[0].addVaccine(vaccineArr[i])
        }
        res.status(200).json('saved to db')

    }catch (error){
        console.log(error);
        res.json({error})
    }

}


module.exports = countryControllers