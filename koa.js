/**
* koa2 入口
* @param  {[type]} options [description] 传入参数
* @return {[type]}         [description] 返回值
*/
const koa = require('koa')
const bodyParser = require('koa-body');
const route = require('./route')
const cors = require('koa-cors')
const logger = require('koa-logger')
const schedule = require('./schedule')
const moment = require('moment')
const static = require('koa-static')
const path = require('path')
var app = new koa()

// 跨域
app.use(cors())
// 静态资源暴露
app.use(static(path.join(__dirname, 'public')))
// 处理post/图片等 
app.use(bodyParser({
    multipart: true,
    formidable:{
        uploadDir:'public', // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (type, file) => {
            const name = `${moment().format('YYYY-MM-DD')}_${file.name}`
            console.log(file,'--file--');
            file.name = name
            file.path = `public/${name}`
        }
    },
    onError: (err) => {
        console.log('错误提示：', err);
    }
}));
// 日志
app.use(logger())
// 注册路由
app.use(route.routes(), route.allowedMethods())
// 定时任务
schedule.scheduleCronstyle()
// 监听端口
var port = 3000
app.listen(port, () => {
    console.log(`the serve is on ${port}`);
})
// 错误日志
app.on('error', err => {
    console.log('server error', err);
})
