const httpCode = require('../../utils/httpCode');
const code_body = new httpCode();
const query = require('../../db');
const jwt = require('jsonwebtoken');
const path = require('path');
const serve_key = 'iDark';
function jwt_verify(token) {
    return new Promise(( resolve, reject) => {
        jwt.verify(token, serve_key, (err, decoded) => {
            if(err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })

}
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
    /**
    * 注册账号
    * @param auth: 权限 1：超级管理员； 2：普通用户
    */
    async register(ctx) {
        let { username, password, auth } = ctx.request.body
        const res = await query(`select * from account where username='${username}'`,'')
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
            if(!auth) {
                ctx.body = code_body.fail({
                    msg: '请选择权限！'
                })
                return
            }
            const data = await query(`insert into account set username=?, password=?, auth=?`, [username, password, auth])
            if(data) {
                ctx.body = code_body.success({
                    msg: '注册成功！'
                })
            }
        }
    },
    // 删除账号
    async delete_account(ctx) {
        let { username } = ctx.request.body
        let { authorization } = ctx.header
        const user_jwt = await jwt_verify(authorization)
        if(user_jwt.username === username) {
            ctx.body = code_body.fail({
                msg: '无法删除自己！'
            })
            return
        }

        const res = await query(`delete from account where username='${username}'`,'')
        ctx.status = 200
        if(res.length > 0) {
            ctx.body = code_body.fail({
                msg: '删除失败！'
            })
        } else {
            ctx.body = code_body.success({
                msg: '删除成功！'
            })
        }
        ctx.body = code_body.fail({
            msg: error
        })

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
                        msg: 'token验证失败！',
                        data: err
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

