'use strict';
/**
 * @desc 用户信息服务
 * @created 2018-11-7
 * @author 陈华展
 */

const redis_service = require(`${documentRoot}/services/redis`)
module.exports = {
    async getUserInfo (openid) {
        try {
            const info = await redis_service.getValue(openid);
            return info ? JSON.parse(info) : '';
        }catch (e) {
            ErrorHandler(e)
            return false
        }
    },
    async getUserInfoForAjax (openid) {
        try {
            let userInfo = await this.getUserInfo(openid);
            if (!userInfo || dataHandler.isEmptyObject(userInfo)) {
                ErrorHandler('Openid Exception!!')
                return false
            }else {
                return userInfo;
            }
        }catch (e) {
            ErrorHandler(e)
            return false
        }
    },
}