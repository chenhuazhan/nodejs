
const comment = require('../models/comment')

exports.response = function (req, res) {
    let url = req.url.substring(4)
    console.log(url);
    let data = []
    switch (url) {
        case '/getcomment/':
            comment.getAllComment(res)
            break
    }
}