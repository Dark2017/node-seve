/**
* 接口返回标准格式类 
* @param  {[type]} data [你返回的数据] 传入参数
* @return {[type]}      [void] 返回值
*/
module.exports = class httpCode {
    constructor() {

    }
    success(data) {
        return JSON.stringify({
            code: 0,
            data,
            msg: "success"
        })
    }
    fail(data) {
        return JSON.stringify({
            code: -1,
            data,
            msg: "fail"
        })
    }
}