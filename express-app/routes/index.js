const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.html', {title: 'Express'});
});


router.use('/api', require('./api/index'));
router.use('/user', require('./admin/user'), require('./home/user'));
router.use('/dynamic', require('./home/dynamic'));
router.use('/baixiu', require('./baixiu/index'));
router.use('/topic', require('./home/topic'));
router.use('/student', require('./student/index'));
router.use('/music_player', require('./music/player'));
router.use('/game', require('./game/index'));
router.use('/my_space',  require('./my_space/index'));
router.use('/leave_msg', require(`${documentRoot}/middlewares/locals`), require('./leave_msg'));


module.exports = router;
