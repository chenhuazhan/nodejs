const express = require('express');
const router = express.Router();
const LeaveMsg = require(`${documentRoot}/models/leave_msg`)
const User = require(`${documentRoot}/models/user`)


router.get('/get', async (req, res) => {
    let page = parseInt(req.query.page)
    let pageSize = parseInt(req.query.pageSize)
    if(!page || !pageSize){
        return response.fail(res, 400)
    }
    let start = (page-1) * pageSize
    let ret  = await LeaveMsg.getLimit(start, pageSize)
    let allLeaveMsg = []
    if(ret.length > 0){
        for(let i = 0; i < ret.length; i++){
            allLeaveMsg[i] = {}
            let keys = [ '_id','content','creator','created_time','like_count','likes','replies']
            for(let key in ret[i]){
                if(key == 'creator'){
                    let user = await User.getUserInfoById(ret[i].creator)
                    allLeaveMsg[i][key] = {
                        openid: user._id,
                        avatar: user.avatar,
                        nickname: user.nickname,
                        gender: user.gender,
                    }
                } else {
                    if(keys.includes(key)){
                        allLeaveMsg[i][key] = ret[i][key]
                    }
                }
            }
        }
    }
    response.success(res, allLeaveMsg)
});
router.post('/add',require(`${documentRoot}/middlewares/locals_for_ajax`), async (req, res) => {
    if(!req.body.openid || !req.body.content){
        return response.fail(res, 400)
    }
    let leave_msg = {
        creator: auser_info[req.body.openid].openid,
        content: utility.encodeSpecialStr(req.body.content)
    }
    leave_msg = await LeaveMsg.add(leave_msg ,res)
    return response.success(res, leave_msg)
});
router.get('/delete', require(`${documentRoot}/middlewares/locals_for_ajax`), async (req, res) => {
    let id = req.query.id
    let creator = auser_info[req.query.openid].openid
    if(!id || !creator){
        return response.fail(res, 400)
    }
    let ret = await LeaveMsg.delete(id, creator)
    if(ret.ok === 1 && ret.nModified === 1){
        return response.success(res)
    }
    res.send({
        code: '500',
        msg: '删除留言失败'
    });
})
router.post('/reply', require(`${documentRoot}/middlewares/locals_for_ajax`), async (req, res, next) => {
    if(!req.body.replay_to || !req.body.content || !req.body.openid){
        response.fail(res, 400)
    }
    let reply_to = req.body.replay_to
    let reply = {
        creator: auser_info[req.body.openid].nickname,
        content: utility.encodeSpecialStr(req.body.content)
    }
    let ret = await LeaveMsg.addReply(reply,reply_to)
    reply.created_time = Date.now()
    if(ret.ok === 1){
        return res.status(200).send({
            code: '200',
            msg: config.code['200'],
            data: reply
        });
    }
    res.send({
        code: '400',
        msg: '发表回复失败'
    });

});

router.get('/like', require(`${documentRoot}/middlewares/locals_for_ajax`), async (req, res, next) => {
    if(!req.query.like_to || !req.query.openid){
        response.fail(res, 400)
    }
    let like_to = req.query.like_to
    let openid = req.query.openid
    let liker = auser_info[openid].openid

    let ret = await LeaveMsg.like(liker, like_to)
    switch (ret) {
        case 1:
            return res.status(200).send({
                code: '200',
                msg: config.code['200'],
                data: 1
            });
            break
        case -1:
            return res.status(200).send({
                code: '200',
                msg: config.code['200'],
                data: -1
            });
            break
        default:
            res.send({
                code: 500,
                msg: config.code['500'],
            });
    }
});

module.exports = router;
