module.exports = function(app) {
    let login = true;
    app.all('*', (req, res, next) => {
        if (!login) return res.json('未登录');
        next();
    })
    app.get('/', function(req, res) {
        res.send('hello world')
    })
}