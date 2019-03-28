//使用了模板引擎的node-apache版本
const fs = require('fs')
const path = require('path')
const tpl = require('art-template')
const config = require('../config')
const documentRoot = config.documentRoot

exports.response = function (req, res) {
    let url = req.url
    console.log(url)
    let tmp = documentRoot + url
    let exist = fs.existsSync(tmp)
    if (exist) {
        let stats1 = fs.statSync(tmp)
        if (stats1.isDirectory()) {
            for (let key in config.directoryIndex) {
                let file = tmp + '/' + config.directoryIndex[key]
                console.log(`${config.host}:${config.port + url + config.directoryIndex[key]}`);
                if (fs.existsSync(file)) {
                    res.writeHead(302, {'Location': `${config.host}:${config.port + url + config.directoryIndex[key]}`})
                    res.end()
                    return
                }
            }
            if (!config.directoryBrowse) {
                //没有开放目录浏览权限
                res.writeHead(403, {"Content-Type": "text/html"});
                res.end('<h2>403 forbidden!!</h2>')
                return
            }
            fs.readFile(path.join(__dirname, '../views/template-apache.html'), function (err, data) {
                console.log(path.join(__dirname, '../views/template-apache.html'));
                if (err) {
                    return res.end('404 Not Found.')
                }
                let prevDisplay = 'block'
                if (url == '/') {
                    prevDisplay = 'none'
                }
                fs.readdir(tmp, function (err, files) {
                    if (err) {
                        return res.end('Can not find www dir.')
                    }
                    let fileObjArr = []
                    for(key in files){
                        fileObjArr[key] = {}
                        fileObjArr[key].name = files[key]
                        fileObjArr[key].type = 'file'
                        fileObjArr[key].separate = ''
                        let stats = fs.statSync(tmp + files[key])
                        if (stats.isDirectory()) {
                            fileObjArr[key].type = 'dir'
                            fileObjArr[key].separate = '/'
                        }
                        fileObjArr[key].href = `${config.host}:${config.port + url + files[key] + fileObjArr[key].separate}`
                    }
                    let parentPath = url.substring(0, url.substr(0, url.length - 1).lastIndexOf('/') + 1)
                    let htmlStr = tpl.render(data.toString(), {
                        title: 'Index Of' + url,
                        files: fileObjArr,
                        prevDisplay,
                        parentPath
                    })
                    res.end(htmlStr)
                })
            })
        } else {
            //渲染文件
            fs.readFile(tmp, function (err, data) {
                if (err) {
                    res.end()
                }
                let ext = path.extname(tmp).substring(1)
                if (ext in config.mineType.text) {
                    res.setHeader('Content-Type', `${config.mineType.text[ext]}; charset=${config.charset}`)
                } else if (ext in config.mineType.image) {
                    res.setHeader('Content-Type', `${config.mineType.text[ext]}`)
                } else {
                    res.setHeader('Content-Type', `${config.mineType.other}; charset=${config.charset}`)
                }
                res.end(data)
            })
        }
    } else {
        res.end()
    }
}

