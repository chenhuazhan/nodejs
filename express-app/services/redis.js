'use strict';
/**
 * @desc redis 服务层
 * @created 2017-06-23
 * @author zz_hang
 */
const redis = require('redis');
const client = redis.createClient(config.redis.port,config.redis.host);

class RedisClient {
    constructor () {
        client.select(config.redis.default.database);
    }
    getValue (key) {
        return new Promise((resolve, reject) => {
            client.get(key, (error,data) => {
                if (error) return reject(error);
                resolve(data);
            });
        });
    }
    setValue (key,value,expire) {
        client.set(key, value, (err,data) => {
            if (ErrorHandler(err,data) && expire) {
                client.expire(key,expire);
            }
        });
    }
    emptyValue (key) {
        this.setValue(key,'');
    }
    setExpire (key,expire) {
        client.expire(key, expire);
    }
}

module.exports = new RedisClient()
