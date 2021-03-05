/**
* koa2 入口
* @param  {[type]} options [description] 传入参数
* @return {[type]}         [description] 返回值
*/
const koa = require('koa')
const bodyParser = require('koa-bodyparser');
const route = require('./route')
const cors = require('koa-cors')
const logger = require('koa-logger')
const moment = require('moment')
var app = new koa()

// 跨域
app.use(cors())
// 处理post 中间件
app.use(bodyParser());
// 日志
app.use(logger())
// 注册路由
app.use(route.routes(), route.allowedMethods())

// 监听端口
var port = 3000
app.listen(3000, () => {
    console.log(`the serve is on ${port}`);
})
// 错误日志
app.on('error', err => {
    console.log('server error', err);
})
