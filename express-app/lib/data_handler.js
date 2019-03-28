'use strict';
/**
 * @desc 数据处理工具包
 * @created 2019-03-17
 * @author 陈华展
 */

module.exports = {
    isObject(obj){
        return obj instanceof Object
    },
    isEmptyObject(obj){
        if(!this.isObject(obj)) return;
        for(let key in obj) return false;
        return true;
    }
}