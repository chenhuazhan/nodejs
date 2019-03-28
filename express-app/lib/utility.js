'use strict';
/**
 * @desc 后端公共工具包
 * @created 2018-11-8
 * @author 陈华展
 */
const MD5 = require('md5')

module.exports = {
    /**
     * @desc 普通字符转换成转义字符
     */
    encodeSpecialStr: function (str) {
        return str? str.replace(/[<>&"'\\]/ig, function (i) {
             return {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;', '\\': '\\\\'}[i];
        }) : '';
    },
    /**
     * @desc 去掉所有html标签
     */
    removeHtmlLabel: function (str) {
        return str ? str.replace(/<[^<>]+?>/ig, '') : '';
    },
    /**
     * @desc &nbsp;转成空格
     */
    nbspToSpace: function (str) {
        return str ? str.replace(/&(nbsp);/ig, function (i, v) {
            return {'nbsp': ' '}[v]
        }) : '';
    },
    /**
     * @desc 回车转换行
     */
    transformReturnToBr: function (str) {
        return str ? str.replace(/\r?\n/g, "<br>") : '';
    },
    /**
     * @desc 将<br> 转换成 换行
     */
    transformBrToLn: function (str) {
        return str ? str.replace(/<br>/g, "\n") : '';
    },
    /**
     * @desc 将 \n 转换 <br>
     * @param str
     */
    transformLnToBr: function (str) {
        return str ? str.replace(/\n/g, '<br>') : '';
    },
    /**
     * @desc 处理出错状态码
     * @param e
     * @param code
     * @param hook
     */
    sendErrCodeMsg(hook, code, e) {
        ErrorHandler(e)
        hook.send({
            code: code,
            msg: config.code[code],
            data: {}
        })
    },
    /**
     * @desc 发送请求成功数据
     * @param data
     * @param hook
     */
    sendSuccessMsg(hook, data = {}) {
        hook.status(200).json({
            code: 200,
            msg: config.code['200'],
            data: data
        })
    },
    sign(object, key) {
        var querystring = this.createQueryString(object);
        if (key) querystring += '&key=' + key;
        return MD5(querystring).toUpperCase();
    },
    createNonceStr(length) {
        length = length || 24;
        if (length > 32) length = 32;
        return (Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)).substr(0, length);
    },
    getTimestamp(timestamp) {
        if(timestamp)
            return parseInt(new Date(timestamp).getTime() / 1000) + ''
        return parseInt(Date.now() / 1000) + ''
    },
    createQueryString(options) {
        return Object.keys(options).filter(function (key) {
            return options[key] !== undefined && options[key] !== '' && ['pfx', 'apiKey', 'sign', 'key'].indexOf(key) < 0;
        }).sort().map(function (key) {
            return key + '=' + options[key];
        }).join('&');
    }
}
