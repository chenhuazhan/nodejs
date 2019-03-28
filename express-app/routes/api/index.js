const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use('/leave_msg', require('./leave_msg'))
router.use('/user', require('./user'))
/* GET home page. */

router.get('/music', async (req, res) => {
    axios.get('https://api.bzqll.com/music/tencent/search?key=579621905&s=%E5%93%88%E5%93%88%E5%93%88%E7%AC%AC%E4%B8%80&limit=100&offset=0&type=song').then(function (ret) {
        res.send(ret.data)
    })

})
router.get('/', (req, res) => {
    res.status(403).send('api page');
});

module.exports = router;
