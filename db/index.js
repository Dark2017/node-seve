var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'idark'
});
/**
* @param  sql [查询语句] 传入参数
* @param  values [值，非必填] 传入参数
* @return Promise [查询结果] 返回值
*/
let query = (sql, values) => {
    return new Promise(( resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
                connection.release()
            }
        })
    })
}


module.exports = query