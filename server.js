const express = require('express')
const app = express()

const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const userRouters = require('./routes/userRoutes')
app.use('/user', userRouters)



const PORT = process.env.port || 3001
app.listen(PORT, () => {
    console.log(`port running on ${PORT}`)
  routesReport.print()
})
