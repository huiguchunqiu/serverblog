module.exports = {
    port: 3000, // 端口号
    session: { // session 缓存                             
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000 // 最长时间   
    }
}