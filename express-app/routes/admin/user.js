/**
 * Mongoose users 管理路由模块
 */
let User = require(`${documentRoot}/models/user`)
let express = require('express')
let router = express.Router()
/*
 * 渲染学生列表页面
 */
router.get('/', async (req, res) => {
    let users =await User.getAllUserInfo ()
    console.log(users);
    res.render('admin/user/index.html', {
        users: users
    })
})

/*
 * 渲染添加学生页面
 */
router.get('/new', function (req, res) {
    res.render('admin/user/new.html')
})

/*
 * 处理添加学生
 */
router.post('/new', async (req, res) => {
    await User.addUser (req.body)
    res.redirect('/user')
})

/*
 * 渲染编辑学生页面
 */
router.get('/edit', async (req, res) => {
    let user = await User.getUserInfoById(req.query.id.replace(/"/g, ''))
    res.render('admin/user/edit.html', {
        user: user
    })
})

/*
 * 处理编辑用户
 */
router.post('/edit', async (req, res) => {

    let id = req.body.id.replace(/"/g, '')
    delete req.body.id
    console.log(req.body);
    await User.updateUserInfoById(id,  req.body)
    res.redirect('/user')
})

/*
 * 处理删除学生
 */
router.get('/delete', async (req, res)=> {
    var id = req.query.id.replace(/"/g, '')
    await User.deleteUserById(id)
    res.redirect('/user')
})
module.exports = router
