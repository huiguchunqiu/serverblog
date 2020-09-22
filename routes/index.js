const db = require("../db");
module.exports = function(app) {
  app.all('/user/*', (req, res, next) => {
    const userinfo = req.session.userinfo;
    if (!userinfo) {
      return res.json({ userinfo: { islogin: false } })
    }
    next();
  })

  app.get('/', function(req, res) {
    res.send('hello world')
  })

  app.get('/user/userinfo', function(req, res, next) {
    const userinfo = req.session.userinfo;
    if (!userinfo) {
      res.json({ userinfo: { islogin: false } })
    } else {
      res.json({ userinfo })
    }
  })

  app.post('/task/login', (req, res, next) => {
    const data = req.body
    if (!data.username) {
      res.json({ code: 4000, msg: '请输入用户名！' })
      return
    }
    const sql = "SELECT password,id FROM USERS WHERE username =" + req.body.username
    db.query(sql, [], function(results, fields) {
      console.log(results)
      if (!results.length) {
        res.json({ code: 1000, msg: '用户不存在' })
      } else if (results[0].password !== data.password) {
        res.json({ code: 3000, msg: '密码错误！' })
      } else {
        const userinfo = {
          name: data.username,
          id: results[0].id,
          islogin: true
        }
        req.session.userinfo = userinfo;
        res.json({ code: 2000, msg: '登录成功', userinfo: userinfo })
      }
    })
  })

  app.get('/task/loginout', (req, res, next) => {
    req.session.destroy();
    res.json({ code: 2000, msg: '退出成功' })
  })
}