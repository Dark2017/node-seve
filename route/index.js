const Router = require('koa-router')
const userctrl = require('../controllers/common')

let routes = new Router()

routes
    .post('/login', userctrl.login)
    .post('/register', userctrl.register)
    .get('/', (ctx) => {
        ctx.body = 'welcome!'
    })
    .post('/test', userctrl.test)
    .get('/test1', userctrl.test1)

module.exports = routes
