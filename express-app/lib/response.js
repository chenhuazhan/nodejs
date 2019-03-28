'use strict';
/**
 * @desc 路由应答器
 * @created 2019-3-17
 * @author 陈华展
 */

module.exports = {
    /**
     * @desc 发送请求成功数据
     * @param data
     * @param hook
     */
    success(hook, data = {}) {
        hook.status(200).json({
            code: 200,
            msg: config.code['200'],
            data: data
        })
    },
    fail(hook, code) {
        hook.status(200).json({
            code: code,
            msg: config.code[code]
        })
    },
    serverErr(hook,e) {
        ErrorHandler(e)
        hook.status(500).send({
            code: 500,
            msg: config.code[500]
        })
    },
}