const httpCode = require('../../utils/httpCode');
const code_body = new httpCode();
const query = require('../../db');
const jwt = require('jsonwebtoken');
const path = require('path');
const serve_key = 'iDark';
module.exports = {
    // 用户登录
    async login(ctx) {
        let { username, password } = ctx.request.body
        const res = await query(`select * from account where username='${username}' and password='${password}'`, '')
        const token = jwt.sign(ctx.request.body, serve_key, { expiresIn: '1h'})
        ctx.status = 200
        if(res.length == 0) {
            ctx.body = code_body.fail({
                msg: '账号或密码错误！'
            })
        } else {
            ctx.body = code_body.success({
                token,
                msg: '登录成功！'
            })
        }
    },
    // 注册账户
    async register(ctx) {
        let { username, password } = ctx.request.body
        const res = await query(`select * from account where username='${username}'`, '')
        ctx.status = 200
        if(res.length > 0) {
            ctx.body = code_body.fail({
                msg: '账号已存在！'
            })
        } else {
            if(!password) {
                ctx.body = code_body.fail({
                    msg: '请填写密码！'
                })
                return
            }
            const data = await query(`insert into account set username=?, password=?`, [username, password])
            if(data) {
                ctx.body = code_body.success({
                    msg: '注册成功！'
                })
            }
        }
    },
    // post测试
    test(ctx) {
        ctx.body = code_body.success('this is a post request and result is: '
                + ctx.request.body.value + '123456')
    },
    // get测试
    test1(ctx) {
        console.log(ctx.request.query,'-ctx-');
        ctx.body = code_body.success('this is a get request and result is: '
                + ctx.request.query.value + '123456'
            )
    },
    // token验证测试
    async verifyToken(ctx) {
        let { authorization } = ctx.header
        ctx.status = 200
        if(authorization) {
            jwt.verify(authorization, serve_key, (err, decoded) => {
                if(err) {
                    ctx.body = code_body.fail({
                        msg: 'token验证失败！'
                    })
                } else {
                    ctx.body = code_body.success({
                        msg: 'token验证成功！',
                        data: decoded
                    })
                }
            })
            return
        }
        ctx.body = code_body.fail({
            msg: 'token为空！'
        })
    },
    // 文件上传测试
    async upload(ctx) {
        const { file } = ctx.request.files
        let basename = path.basename(file.path)
        ctx.body = code_body.success({
            url: `${ctx.origin}/${basename}` 
        })
    }
}

