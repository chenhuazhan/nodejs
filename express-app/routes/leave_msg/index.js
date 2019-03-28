let express = require('express')
let router = express.Router()

router.get('/', function (req, res) {
    res.render('leave_msg/list.html',{
        layui: true
    })
})


module.exports = router
