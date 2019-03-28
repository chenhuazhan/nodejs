var common = {
    domain: 'http://127.0.0.1',
    port: 8000,
    /**
     * 拼接路径
     * @param path
     * @return str
     */
    buildServerUrl: function (path) {
        var str = this.domain + ':' + this.port
        if (path.trim()[0] == '/') {
            str += path
        } else {
            str += '/' + path.trim()
        }
        return str
    },
    /**
     * 设置cookie
     * @param key
     * @param value
     * @param day
     * @param path
     * @param domain
     */
    addCookie: function (key, value, day, path, domain) {
        // 1.处理默认保存的路径
        var index = window.location.pathname.lastIndexOf("/")
        var currentPath = window.location.pathname.slice(0, index);
        path = path || currentPath;
        // 2.处理默认保存的domain
        domain = domain || document.domain;
        // 3.处理默认的过期时间
        if (!day) {
            document.cookie = key + "=" + value + ";path=" + path + ";domain=" + domain + ";";
        } else {
            var date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key + "=" + value + ";expires=" + date.toGMTString() + ";path=" + path + ";domain=" + domain + ";";
        }
    },
    /**
     * @desc 获取cookie
     * @param key
     * @return str
     */
    getCookie: function (key) {
        var res = document.cookie.split(";");
        for (var i = 0; i < res.length; i++) {
            var temp = res[i].split("=");
            if (temp[0].trim() === key) {
                return temp[1];
            }
        }
    },
    /**
     * @desc 删除cookie
     * @param key
     * @param path
     */
    delCookie: function (key, path) {
        // 默认情况下只能删除默认路径中保存的cookie, 如果想删除指定路径保存的cookie, 那么必须在删除的时候指定路径才可以
        var index = window.location.pathname.lastIndexOf("/")
        var currentPath = window.location.pathname.slice(0, index);
        path = path || currentPath;
        this.addCookie(key, this.getCookie(key), -1, path);
    },
    /**
     * @desc \n转<br>;
     * @param str
     * @return str
     */
    transformLnToBr: function (str) {
        return str ? str.replace(/\n/g, '<br>') : '';
    },
    /**
     * @desc 空格转&nbsp;
     * @param str
     * @returns str
     */
    transformSpace: function (str) {
        return str ? str.replace(/\s/g, '&nbsp;') : '';
    },
    /**
     * @desc 格式化文本内容
     * @param str
     * @returns str
     */
    formatContent: function (str) {
        str = this.transformLnToBr(str)
        return this.transformSpace(str)
    },
    /**
     * @desc 10以内数字前补0
     * @param num
     * @returns string||number
     */
    formatNum: function (num) {
        return num.toString().padStart ? num.toString().padStart(2, '0') : (num > 9 ? num : '0' + num)
    },
    /**
     * @desc 格式化日期 例：YYYY-MM-DD [hh:mm:ss]
     * @param timestamp
     * @param split_str 日期分隔符
     * @param flag = false 是否返回时分秒部分
     * @return str
     */
    formatDate: function (timestamp, split_str, flag) {
        split_str = split_str || '-'
        flag = flag || false
        var date = new Date(timestamp);
        var arr1 = [date.getFullYear() + split_str,
            this.formatNum(date.getMonth() + 1) + split_str,
            this.formatNum(date.getDate())]
        var arr2 = [this.formatNum(date.getHours()) + ':',
            this.formatNum(date.getMinutes()) + ':',
            this.formatNum(date.getSeconds())];
        return arr1.join('') + ' ' + (flag ? '' : arr2.join(''));
    },
    /**
     * @desc 格式化时间
     * @param timestamp
     * @return {string|string}
     */
    formatTime: function (timestamp) {
        var time0 = new Date(timestamp);
        var time1 = time0.getTime().toString()
        timestamp = parseInt(time1.substring(0, time1.length - 3))
        var space = this.getCurrentTime() - timestamp;     //时间间隔
        //console.log(this.getCurrentTime(),timestamp,space);
        var str = '';

        if (space < 3600) {
            //一小时以内
            str = this.formatNum(time0.getHours()) + ':' + this.formatNum(time0.getMinutes());
        } else if (space < 86400) {
            //1~24小时
            str = parseInt(space / 3600) + '小时前';
        } else if (space < 604800) {
            //24小时~1周
            str = parseInt(space / 86400) + '天前';
        } else if (space < 31536000) {
            var currentYear = new Date().getFullYear();
            var time0Year = time0.getFullYear();
            if (time0Year >= currentYear) {
                str = this.formatNum(time0.getMonth() + 1) + '-' + this.formatNum(time0.getDate());  //1周~一年
            } else {
                str = time0Year + '.' + this.formatNum(time0.getMonth() + 1) + '.' + this.formatNum(time0.getDate());  //跨年
            }
        } else {
            //一年以上
            str = time0.getFullYear() + '.' + this.formatNum(time0.getMonth() + 1) + '.' + this.formatNum(time0.getDate());
        }

        return str;
    },
    getCurrentTime: function () {
        var date = new Date();
        var time = date.getTime().toString();
        return parseInt(time.substring(0, time.length - 3));
    },
    /**
     * @desc Ajax更多加载提示
     */
    showLoadMore: function (options) {
        var param = {
            selector: options.selector || '.user-container',
            content: options.content || '加载中',
            pull_fresh: options.pull_fresh || false
        }
        var _temp = '<div class="load-more-container">' +
            '   <i class="load-more-img layui-icon layui-icon-loading"></i>&nbsp;&nbsp;' +
            '   <i class="text">' + param.content + '</i>' +
            '</div>';
        if (param.pull_fresh) {
            $(param.selector).prepend(_temp);
        } else {
            $(param.selector).append(_temp);
        }
    },
    removeLoadMore: function () {
        $('.load-more-container').remove()
    },
    showNoMore: function (selector) {
        selector = selector || '.user-container'
        $(selector).append('<div class="load-no-more">已加载全部内容</div>')
    },
    showNoData: function (selector) {
        selector = selector || '.user-container'
        $(selector).append('<div class="load-no-data">暂无数据</div>')
    },
    removeNoData: function (selector) {
        $('.load-no-data').remove()
    },
    requestAjax: function (ajax_info, callback, errcallback) {
        var _this = this;
        var show_request = ajax_info.show_request == undefined ? true : ajax_info.show_request;

        if (show_request) _this.showLoadRequest();
        $.ajax({
            type: ajax_info.type ? ajax_info.type : 'GET',
            url: ajax_info.url,
            data: ajax_info.data || '',
            dataType: 'json',
            async: ajax_info.async || true,
            timeout: ajax_info.time ? ajax_info.time : 20000,
            cache: ajax_info.cache || false,
            success: function (result) {
                _this.removeRequestCover();
                return _this.clientErrorHandler(result, callback, errcallback);
            },
            error: function (err) {
                _this.removeRequestCover();
                _this.showAjaxError();
            }
        });
    },
    showLoadRequest: function (){
        var _temp = '<div class="cover-container">'+
            '   <div class="request-load">' +
            '       <i class="request-load-img layui-icon layui-icon-loading"></i>' +
            '       <div>'+ 'loading' + '</div>' +
            '   </div>'+
            '</div>';
        $('.user-container').append(_temp);
    },

    /**
     * @desc 清除loading遮罩
     */
    removeRequestCover: function () {
        $('.cover-container').remove()
    },
    showAjaxError: function () {
        this.show_center_tip('网络连接超时，请重试', 2000, 'warn')
    },
    clientErrorHandler : function (result, callback, errcallback) {
        if (result.code == 200){
            return callback(result.data)
        }else {
            if(errcallback){
                errcallback(result)
            }else{
                this.show_center_tip(ERROR_CODE[result.code] || result.message)
            }
        }
    },
    /**
     * @desc 中间弹出提示
     */
    show_center_tip : function (content) {
        alert(content)
        //TODO
    },
}