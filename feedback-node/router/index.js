const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
const template = require('art-template')
const axios = require('axios')
const unity = require('../unity')
const staticPath = require('./public')
const nodeModules = require('./node_modules')
const api = require('./dao')
const comment = require('../models/comment')


exports.onRequest = function (req, res) {
    // 简写方式，该函数会直接被注册为 server 的 request 请求事件处理函数
    // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
    let parseObj = url.parse(req.url, true)

    // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    let pathname = parseObj.pathname
    if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                res.statusCode = 404
                res.end('404 Not Found.')
                return
            }
            axios.get('http://127.0.0.1:3000/api/getcomment/')
                .then(function (response) {
                    console.log(response.data)
                    let comments = response.data.comments
                    comments.forEach(function (comment) {
                        comment.created_at = unity.timeFormat(comment.created_at)
                    })
                    let htmlStr = template.render(data.toString(), {
                        comments: comments
                    })
                    res.end(htmlStr)
                })
                .catch(function (error) {
                    console.log(error)
                    let htmlStr = template.render(data.toString(), {
                        comments: []
                    })
                    res.end(htmlStr)
                })

        })
    } else if (pathname === '/post') {
        // 其它的都处理成 404 找不到
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                res.statusCode = 404
                res.end('404 Not Found.')
                return
            }
            res.end(data)
        })
    } else if (pathname.indexOf('/api/') === 0) {
        // 统一处理：
        //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public中的某个资源
        //    所以我们就直接可以把请求路径当作文件路径来直接进行读取
        api.response(req, res)
    } else if (pathname.indexOf('/public/') === 0) {
        // 统一处理：
        //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public中的某个资源
        //    所以我们就直接可以把请求路径当作文件路径来直接进行读取
        staticPath.response(req, res)
    } else if (pathname.indexOf('/node_modules/') === 0) {
        // 开放node_modules目录
        nodeModules.response(req, res)
    } else if (pathname === '/pinglun' && req.method.toLowerCase() === 'post') {
        let str = ''
        req.on('data', data => {
            str += data
        })

        //数据全部到达触发（一次）
        req.on('end', () => {
            //console.log(str)
            let comment_data = querystring.parse(str)
            comment.addComment(res,comment_data)
            console.log(comment);
        })

    } else {
        // 其它的都处理成 404 找不到
        fs.readFile('./views/404.html', function (err, data) {
            if (err) {
                res.statusCode = 404
                res.end('404 Not Found.')
                return
            }
            res.end(data)
        })
    }
}