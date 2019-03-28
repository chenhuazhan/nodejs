const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');
const app = express();

global.config = require('./config/index')
global.documentRoot = __dirname
global.ErrorHandler = require('./lib/error_handler')
global.ruser_info = {};
global.auser_info = {};
global.utility = require('./lib/utility')
global.response = require('./lib/response')
global.dataHandler = require('./lib/data_handler')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.engine('html', require('express-art-template'))

app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'express',
    resave: false,
    saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

app.use('/', require('./routes/index'));

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    res.status(err.status || 404);
    res.send('<h1>404 Not Found</h1>');
});



module.exports = app;
