module.exports = {
    port: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    dataBase: {
        host: 'localhost',
        port: 3306,
        user: 'wangxuyang',
        password: 'wxy123456',
        database: 'blog'
    }
}