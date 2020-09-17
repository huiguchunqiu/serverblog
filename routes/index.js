const db = require("../db");
module.exports = function(app) {
    let login = true;
    app.all('*', (req, res, next) => {
        if (!login) return res.json('未登录');
        next();
    })
    app.get('/', function(req, res) {
        res.send('hello world')
    })
    app.post('/login', (req, res, next) => {
        const data = req.body
        console.log(data)
        if (!data.username) {
            res.json({ code: 4000, msg: '请输入用户名！' })
            return
        }
        const sql = "SELECT password,id FROM USERS WHERE username =" + req.body.username
        db.query(sql, [], function(results, fields) {
            console.log(results)
            if (!results[0].password) {
                res.json({ code: 1000, msg: '用户不存在' })
            } else if (results[0].password !== data.password) {
                res.json({ code: 3000, msg: '密码错误！' })
            } else {
                res.json({ code: 2000, msg: '登录成功', id: results[0].id })
            }
        })
    })
}