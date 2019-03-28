/**
 * Mongoose users 管理路由模块
 */
let User = require(`${documentRoot}/models/user`)
let express = require('express')
let md5 = require('md5')
let router = express.Router()
/*
 * 渲染学生列表页面
 */
router.get('/login', async (req, res) => {
    res.render('home/user/login.html')
})

router.post('/login', async (req, res, next) => {
    // 1. 获取表单数据
    // 2. 查询数据库用户名密码是否正确
    // 3. 发送响应数据
    let user = req.body
    user.password = md5(user.password)
    try{
        let result = await User.login(user)
        if(!result){
            res.status(200).json({
                err_code: 1,
                message: 'Email or password is invalid.'
            })
            return
        }
        req.session.user = user

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    } catch (err) {
        res.status(500).json({
            err_code: 500,
            message: err.message
        })
    }
})

router.get('/register', function (req, res, next) {
    res.render('home/user/register.html')
})

router.post('/register', async function (req, res) {
    let user = req.body
    try {
        let result = await User.register(user)
        switch (result) {
            case 500:
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
                break
            case 403:
                return res.status(200).json({
                    err_code: 1,
                    message: '邮箱已存在'
                })
                break
            case 200:
                user.password = md5(user.password)
                // 创建用户，执行注册
                await User.addUser(user)
                return res.status(200).json({
                    err_code: 0,
                    message: 'OK'
                })
        }
    } catch (err) {
        throw err
        res.status(500).json({
            err_code: 500,
            message: err.message
        })
    }
})

router.get('/logout', function (req, res) {
    // 清除登陆状态
    req.session.user = null
    // 重定向到登录页
    res.redirect('/user/login')
})

router.get('/setting/profile', function (req, res) {
    if(!req.session.user){
        return res.redirect('/user/login')
    }
    res.render('home/user/setting/profile.html',{
        profile: true,
        user: req.session.user
    })
})

router.get('/setting/admin', function (req, res) {
    if(!req.session.user){
        return res.redirect('/user/login')
    }
    res.render('home/user/setting/admin.html',{
        admin: true,
        user: req.session.user
    })
})

module.exports = router
