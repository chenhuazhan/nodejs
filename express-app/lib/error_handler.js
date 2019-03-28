'use strict';
/**
 * @desc 平台错误/异常处理
 * @created 2019-03-17
 * @author chenhuazhan
 */

module.exports = (err) => {
    if (err) console.error(config.debug ? err : 'Server Error!!');
}
