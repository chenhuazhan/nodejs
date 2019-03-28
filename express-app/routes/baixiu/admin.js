let express = require('express')
let router = express.Router()

router.get('/', function (req, res) {
    res.render('baixiu/admin/index.html',{
        current: 'index'
    })
})

router.get('/articles', function (req, res) {
    res.render('baixiu/admin/article/index.html',{
        current: 'articles'
    })
})
router.get('/article/edit', function (req, res) {
    res.render('baixiu/admin/article/edit.html',{
        current: 'article-edit'
    })
})
router.get('/article/categories', function (req, res) {
    res.render('baixiu/admin/article/categories.html',{
        current: 'article-categories'
    })
})
router.get('/comments', function (req, res) {
    res.render('baixiu/admin/comments.html',{
        current: 'comments'
    })
})
router.get('/users', function (req, res) {
    res.render('baixiu/admin/users.html',{
        current: 'users'
    })
})
router.get('/settings', function (req, res) {
    res.render('baixiu/admin/setting/settings.html',{
        current: 'settings'
    })
})
router.get('/setting/nav-menus', function (req, res) {
    res.render('baixiu/admin/setting/nav-menus.html',{
        current: 'setting-nav-menus'
    })
})
router.get('/setting/slides', function (req, res) {
    res.render('baixiu/admin/setting/slides.html',{
        current: 'setting-slides'
    })
})
router.get('/user/profile', function (req, res) {
    res.render('baixiu/admin/user/profile.html',{
        current: 'user'
    })
})
router.get('/user/password-change', function (req, res) {
    res.render('baixiu/admin/user/password-change.html',{
        current: 'user'
    })
})
router.get('/user/password-reset', function (req, res) {
    res.render('baixiu/admin/user/password-reset.html',{
        current: 'user'
    })
})
router.get('/user/login', function (req, res) {
    res.render('baixiu/admin/user/login.html',{
        current: 'user'
    })
})



module.exports = router