module.exports = {
  port: 3000, // 端口号
  session: { // session 缓存
    secret: 'myblog',
    key: 'SESSION',
    maxAge: 1000 * 60 * 60 // 最长时间   
  }
}