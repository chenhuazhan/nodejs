const express = require('express')

const router = express.Router()

router.get('/', function (req, res) {
    if(!req.session.user){
        return res.redirect('/user/login')
    }
    res.render('home/dynamic/index.html', {
        user: req.session.user
    })
})

module.exports = router