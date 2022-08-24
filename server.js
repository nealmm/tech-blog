const express   = require('express')
const sequelize = require('./config/connection')
const path      = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT || 3001, () => console.log('Now listening'))
})