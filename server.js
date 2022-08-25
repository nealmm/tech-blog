const express   = require('express')
const exphbs    = require('express-handlebars')
const session   = require('express-session')
const path      = require('path')
const routes    = require('./controllers')
const sequelize = require('./config/connection')

const app            = express()
const hbs            = exphbs.create({})
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sess           = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sess))
app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT || 3001, () => console.log('Now listening'))
})