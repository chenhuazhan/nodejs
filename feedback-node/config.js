const path = require('path')
module.exports = {
    host: 'http://127.0.0.1',   //主机名
    port: 3000,                 //服务器端口号
    documentRoot: __dirname,  //根目录
    directoryBrowse: false,  //是否开启目录浏览功能
    directoryIndex: [    //目录默认访问页
        'index.html',
        'index.htm',
        'deflaut.html'
    ],
    charset: 'utf-8',
    mineType: {
        image: {
            gif: 'image/gif',
            jpeg: 'image/jpeg',
            jpg: 'image/jpeg',
            png: 'image/png',
        },
        text: {
            css: 'text/css',
            htm: 'text/html',
            html: 'text/html',
            js: 'application/x-javascript',
            json: 'application/json',
            pdf: 'application/pdf',
        },
        other: 'text/plain'
    },
    autoOpen: false,    //是否自动打开浏览器
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'chz',
        database: 'nodejs',
        charset: 'utf8'
    }
}


