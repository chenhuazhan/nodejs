'use strict';
/**
 * @desc Ajax Middleware
 * @created 2018-11-7
 * @author 陈华展
 */
const user_info_service = require(`${documentRoot}/services/user_info`);

module.exports = async (req, res, next) => {
    let openid = req.query.openid || req.body.openid || ''
    if(!openid){
        //openid不存在
        return response.fail(res, 400)
    }
    console.log((openid in auser_info));
    //if(!(openid in auser_info)){
        auser_info[openid] = await user_info_service.getUserInfoForAjax(openid)
    //}
    if(!auser_info[openid]){
        //会话过期
        return response.fail(res, 300)
    }
    next();
};
