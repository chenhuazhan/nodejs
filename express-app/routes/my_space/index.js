let express = require('express')
let router = express.Router()


router.get('/', function (req, res) {
    res.render('my_space/index.html',{
        index: 1
    })
})
router.get('/resource', function (req, res) {
    res.render('my_space/resource.html',{
        index: 2
    })
})


module.exports = router