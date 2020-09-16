const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')

const app = express()


//session 中间件
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge // cookie设置过期时间
    },
}))

// flash 中间件
app.use(flash())

routes(app)
app.listen(config.port, () => console.log(`example app listening on port ${config.port}`))