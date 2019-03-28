'use strict';
/**
 * @desc 全局配置项
 * @created 2018-11-7
 * @author 陈华展
 */

const user_info_service = require(`${documentRoot}/services/user_info`);

module.exports = async (req, res, next) => {
    res.locals = {
        config,
        url: `${req.baseUrl}${req.path}` || '',
        user_info: req.session.user || {},
        user: req.session.user? JSON.stringify(req.session.user): '{}'
    };
    next();
}
