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
    console.log('line 40 backend', req.params);
    try {
        
        let user = await models.user.findOne ({
            where: {
                id: req.headers.userId

            }
        })

        console.log('line 47 user controllers', user);

        let countries = await user.getCountries()
        console.log('all countries', countries);
        res.json({countries})

    }catch (error) {
        console.log('not pulling saved countries');
    }
}


module.exports = userController