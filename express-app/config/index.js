const path = require('path')
module.exports = {
    host: 'http://127.0.0.1',   //主机名
    port: 8000,                 //服务器端口号
    charset: 'utf-8',
    autoOpen: false,    //是否自动打开浏览器
    redis: {
        cluster: false,
        default: {
            host: '127.0.0.1',
            port:  6379,
            database: 0,
            password: ''
        }
    },
    code: {
        '100': '用户名已存在',
        '101': '用户名或密码错误',
        '102': '该帐户已被禁用',
        '200': '请求成功',
        '300': '会话过期，请重新登陆',
        '400': 'Api参数错误',
        '500': '服务器出错',
        '600': '请检查你的网络设置'
    },
    debug: true
}


