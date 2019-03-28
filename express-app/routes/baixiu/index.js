let express = require('express')
let router = express.Router()


router.use('/admin', require('./admin'))

router.get('/', function (req, res) {
    res.render('baixiu/home/index.html')
})



module.exports = router