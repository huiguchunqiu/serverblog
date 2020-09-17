var mysql = require('mysql');
var dbConfig = require('./config/db.config')

module.exports = {
    query: function(sql, params, callback) {
        var connection = mysql.createConnection(dbConfig)
        connection.connect(function(err) {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }
        })
        connection.query(sql, params, function(err, results, fields) {
            if (err) {
                console.log('数据库操作失败')
                throw err;
            }
            callback && callback(JSON.parse(JSON.stringify(results)), JSON.stringify(fields))
            connection.end(function(err) {
                if (err) {
                    console.log('关闭数据库连接失败！');
                    throw err;
                }
            })
        })
    }
}