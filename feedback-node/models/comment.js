const mysql = require('mysql');
const config = require('../config')

// 1. 创建连接
var connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    //database:config.mysql.database
});
// 2. 连接数据库
connection.connect();
let sql = 'create database if not exists nodejs  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci'
connection.query(sql, function (error) {
    if (error) throw error
})
connection.query('use nodejs', function (error) {
    if (error) throw error
})

sql = `
create table  if not exists comments  (
  id int(11) NOT NULL AUTO_INCREMENT,
  content text  NOT NULL,
  creator varchar(50) NOT NULL,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  deleted_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
) ;
`
connection.query(sql, function (error) {
    if (error) throw error;
});

exports.getAllComment = function(res){
    // 3. 执行数据操作
    new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM `comments`', function (err, results, fields) {
            if (err) reject(err)
            else resolve(results)
        })
    }).then(function (results) {
        res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'})
        let data = {comments: results}
        res.end(JSON.stringify(data))
    },function (err) {
        throw err
        res.end([])
    })
}

exports.addComment = function(res, data){
    sql = `insert into comments(id, content,creator) values(null, '${data.content}', '${data.creator}')`
    new Promise(function (resolve, reject) {
        connection.query(sql, function (err, results, fields) {
            if (err) reject(err)
            else resolve(results)
        })
    }).then(function (data) {
        // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了
        //    1. 状态码设置为 302 临时重定向
        //        statusCode
        //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
        //        setHeader
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
    },function (err) {
        throw err
        res.end([])
    })
}



// 4. 关闭连接
//connection.end();
