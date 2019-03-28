const express = require('express')
const Topic = require(`${documentRoot}/models/topic`)
const router = express.Router()

router.get('/new', function (req, res) {
    if(!req.session.user){
        return res.redirect('/user/login')
    }
    res.render('home/topic/new.html', {
        user: req.session.user
    })
})
router.post('/new', async (req, res) => {
    let topic = req.body
    let id = (await Topic.add(topic))._id

    res.redirect(`/topic/show?id=${id}`)
})
router.get('/show', async (req, res) => {
    let query = req.query
    let topic = await Topic.getById(query.id)
    if(!req.session.user){
        return res.redirect('/user/login')
    }
    res.render('home/topic/show.html', {
        user: req.session.user,
        topic: topic
    })
})
module.exports = router