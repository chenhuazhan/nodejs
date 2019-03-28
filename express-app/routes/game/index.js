let express = require('express')
let router = express.Router()

router.get('/', function (req, res) {
    res.render('game/index.html')
})



module.exports = router