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

        // console.log(getCountry.data);
        res.json(getCountry.data)

    }catch (error) {
        res.json('country not availble')
    }
}


countryControllers.savedCountry = async (req, res) => {
    try{
        console.log(req.body, 'line 25');
        // let vaccinesArr = ''
        // for(let i = 0; i < req.body.data.vaccinations.length; i++) {
        //     let name = req.body.data.vaccinations[i].name
        //     let message = req.body.data.vaccinations[i].message
        //     // console.log(name, message);
        //     vaccinesArr += `${name}, ${message}; `
        // }
        // console.log('vaccines Array', vaccinesArr);
        const savedCountry = await models.country.findOrCreate ({
            where: {
                //name = column table name & savedCountry = url param from routes file
                name: req.body.data.names.name
            },
            defaults: {
                language: req.body.data.language[0].language,
                // vaccines: vaccinesArr
                
            }
        })
        console.log(savedCountry, 'you got the info');
        
        let findUser = await models.user.findOne ({
            where: {
                id: req.params.userId,
            
            }
        })
        console.log(findUser);

        const addCountry = await findUser.addCountries(savedCountry[0])
        // res.json({addCountry, findUser, savedCountry})
        res.status(200).json('saved to db')

    }catch (error){
        console.log(error);
        res.json({error})
    }

}


module.exports = countryControllers