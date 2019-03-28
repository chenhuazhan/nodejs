/**
 * Mongoose users 管理路由模块
 */
let User = require(`${documentRoot}/models/user`)
let express = require('express')
let md5 = require('md5')
let router = express.Router()

const user_info_service = require(`${documentRoot}/services/user_info`)
const redis_service = require(`${documentRoot}/services/redis`)

router.post('/login', async (req, res, next) => {
    // 1. 获取表单数据
    // 2. 查询数据库用户名密码是否正确
    // 3. 发送响应数据
    let user = req.body
    user.password = md5(user.password)
    try{
        let ret = await User.login(user)
        if(!ret){
            res.status(200).json({
                code: '101',
                msg: config.code['101'],
                data: {}
            })
            return
        }
        user = {
            openid: ret._id,
            email: ret.email,
            nickname: ret.nickname,
            avatar: ret.avatar,
            gender: ret.gender,
        }
        req.session.user = user
        userLogin(res, user)
    } catch (err) {
        throw err
        res.status(500).json({
            code: 500,
            msg: config.code['500']
        })
    }
})

router.post('/register', async (req, res) => {
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
                let ret = await User.addUser(user)
                user = {
                    openid: ret._id,
                    email: ret.email,
                    nickname: ret.nickname,
                    avatar: ret.avatar,
                    gender: ret.gender,
                }
                req.session.user = user
                userLogin(res, user)
        }
    } catch (err) {
        throw err
        res.status(500).json({
            err_code: 500,
            message: err.message
        })
    }
})

router.get('/auth', async (req, res) => {
    let user = await user_info_service.getUserInfo(req.query.openid)
    utility.sendSuccessMsg(res, user)
})

router.get('/logout', function (req, res) {
    // 清除登陆状态
    req.session.user = null
    // 重定向到登录页
    res.redirect('/user/login')
})

function userLogin(hook,user){
    redis_service.setValue (user.openid,JSON.stringify(user),100000000)
    hook.cookie('nickname', user.nickname)
    hook.cookie('openid', user.openid + '')
    console.log(user.openid + 'dddddddddd');
    //hook.redirect('/leave_msg?openid=' + openid)
    utility.sendSuccessMsg(hook, {
        openid: user.openid
    })
}
module.exports = router
