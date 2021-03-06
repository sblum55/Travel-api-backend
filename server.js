const express = require('express')
const app = express()

const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const userRouters = require('./routes/userRoutes')
app.use('/users', userRouters)

const countryRouter = require('./routes/countryRoutes')
app.use('/countries', countryRouter )



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`port running on ${PORT}`)
  routesReport.print()
})
