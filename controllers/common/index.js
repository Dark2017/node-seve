const httpCode = require('../../utils/httpCode');
const codeObj = new httpCode();
const query = require('../../db')
const jwt = require('jsonwebtoken')
const serve_key = 'iDark'
module.exports = {
    // 用户登录
    async login(ctx) {
        let { username, password } = ctx.request.body
        const res = await query(`select * from account where username='${username}' and password='${password}'`, '')
        ctx.status = 200
        if(res.length == 0) {
            ctx.body = JSON.stringify(codeObj.fail({
                msg: '账号或密码错误！'
            }))
        } else {
            ctx.body = JSON.stringify(codeObj.success({
                token: jwt.sign(ctx.request.body, serve_key),
                msg: '登录成功！'
            }))
        }
    },
    // 注册账户
    async register(ctx) {
        let { username, password } = ctx.request.body
        const res = await query(`select * from account where username='${username}'`, '')
        ctx.status = 200
        if(res.length > 0) {
            ctx.body = JSON.stringify(codeObj.fail({
                msg: '账号已存在！'
            }))
        } else {
            if(!password) {
                ctx.body = JSON.stringify(codeObj.fail({
                    msg: '请填写密码！'
                }))
                return
            }
            const data = await query(`insert into account set username=?, password=?`, [username, password])
            if(data) {
                ctx.body = JSON.stringify(codeObj.success({
                    msg: '注册成功！'
                }))
            }
        }
    },
    // post测试
    test(ctx) {
        ctx.body = JSON.stringify(
            codeObj.success('this is a post request and result is: '
                + ctx.request.body.value + '123456'
            )
        )
    },
    // get测试
    test1(ctx) {
        ctx.body = JSON.stringify(
            codeObj.success('this is a get request and result is: '
                + ctx.request.query.value + '123456'
            )
        )
    }

}

