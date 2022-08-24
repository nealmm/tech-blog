const express   = require('express')
const exphbs    = require('express-handlebars')
const path      = require('path')
const routes    = require('./controllers')
const sequelize = require('./config/connection')

const app = express()
const hbs = exphbs.create({})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT || 3001, () => console.log('Now listening'))
})