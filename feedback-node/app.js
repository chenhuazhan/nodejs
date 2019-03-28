const http = require('http')
const router = require('./router/index')
const config = require('./config')

http
    .createServer(router.onRequest)
    .listen(config.port, function () {
        console.log(`server running in: ${config.host}:${config.port}`)
        if(config.autoOpen){
            const cp = require('child_process')
            cp.exec(`start ${config.host}:${config.port}`)  //自动打开浏览器
        }
    })
