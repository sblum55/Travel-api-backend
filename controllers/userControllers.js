const models = require('../models')

const userController = {}

userController.createUser = async (req, res) => {
    try {
       const user = await models.user.create({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password
       })
       res.json({message: 'Account added successfully', user}) 
    }catch (error) {
        res.status(400)
        res.json({error: 'user already exist'})
    }
}

userController.userLogin = async (req, res) => {
    try{
      const user = await models.user.findOne ({
          where: {
              email: req.body.email,
              password: req.body.password
          }
      })
      if (user.password === req.body.password){
          res.json({message: 'login successful', user:user})
      }else {
          res.status(400)
          res.json({error: 'login failed'})
      } 
    }catch (error) {
        res.status(400)
        res.json({error: 'login failed'})
    }
}

userController.getSavedCountries = async (req, res) => {
    try {
        
        let user = await models.user.findOne ({
            where: {
                id: req.params.userId
            }
        })

        let country = await models.country.findAll ({
            where: {
                id: req.body.name
            }
        })

        for (let i = 0; i < countries.length; i++) {
            country[i].getVaccine()
        }

        let countries = await user.getCountries()
        res.json({countries})

    }catch (error) {
        console.log('not pulling saved countries');
    }
}


module.exports = userController