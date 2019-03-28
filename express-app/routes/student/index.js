/**
 * Mongoose students 管理路由模块
 */
let Student = require(`${documentRoot}/models/student`)
let express = require('express')
let router = express.Router()
/*
 * 渲染学生列表页面
 */
router.get('/', async (req, res) => {
    let students =await Student.getAllStudentInfo ()
    res.render('student/index.html', {
        students: students
    })
})

/*
 * 渲染添加学生页面
 */
router.get('/new', function (req, res) {
    res.render('student/new.html')
})

/*
 * 处理添加学生
 */
router.post('/new', async (req, res) => {
    await Student.addStudent (req.body)
    res.redirect('/student')
})

/*
 * 渲染编辑学生页面
 */
router.get('/edit', async (req, res) => {
    let student = await Student.getStudentInfoById(req.query.id.replace(/"/g, ''))
    res.render('student/edit.html', {
        student: student
    })
})

/*
 * 处理编辑学生
 */
router.post('/edit', async (req, res) => {
    let id = req.body.id.replace(/"/g, '')
    delete req.body.id
    await Student.updateStudentInfoById(id,  req.body)
    res.redirect('/student')
})

/*
 * 处理删除学生
 */
router.get('/delete', async (req, res)=> {
    var id = req.query.id.replace(/"/g, '')
    await Student.deleteStudentById(id)
    res.redirect('/student')
})
module.exports = router
