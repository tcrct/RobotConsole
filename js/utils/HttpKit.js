/**
 * 基于JQuery封装Http请求工具
 * HttpKit.duang()
 *      .param() // 请求参数
 *      .header() // 请求头
 *      .ansyPost(function())   //异步post方式提交
 *      .post();
 **/

/**
 * 每次使用均生成一个新的HttpUtil对象，单例模式
 * @type {{duang: (function(): HttpUtil)}}
 */
var HttpKit = {
    duang: function () {
        return new HttpUtil();
    }
}

// 定义HttpUtil对象
var HttpUtil = function() {};

/**
 * 请求地址
 * @param url
 * @returns {HttpUtil}
 */
HttpUtil.prototype.url = function(url) {
    this.requestUrl = url;
    return this;
}

/**
 * 请求参数
 * @param param
 * @returns {HttpUtil}
 */
HttpUtil.prototype.param = function (param) {
    this.requestParam = param;  //this调用位置决定其词法作用域
    return this;
}

/**
 * 请求头
 * @param header
 * @returns {HttpUtil}
 */
HttpUtil.prototype.header = function (header) {
    this.requestHeader = header;
    return this;
}

/**
 * 是否异步，默认为true，需要同步时请设置为false
 * @param async
 * @returns {HttpUtil}
 */
HttpUtil.prototype.isAsync = function (async) {
    this.asyncValue = async;
    return this;
}

/**
 * 设置返回数据的格式
 * @param dataType
 * @returns {HttpUtil}
 */
HttpUtil.prototype.dataType = function (dataType) {
    this.responseDataType = dataType;
    return this;
}

/**
 * get方式请求
 * @param callback
 */
HttpUtil.prototype.get = function(callback) {
    $.ajax({
        method: "get",
        url: this.requestUrl,
        headers: checkIsNotNullOrEmpty(this.requestHeader) ? this.requestHeader : getDefaultHeaderParam(),
        dataType: this.responseDataType,
        async: checkIsNotNullOrEmpty(this.asyncValue) ? this.asyncValue : true,
        data: checkIsNotNullOrEmpty(this.requestParam) ? this.requestParam : "",
        processData: true,
        cache: false,
        success: function (data) {
            callback(data);
        },
        error: function(msg) {
            callback(msg);
        }
    });
}

/**
 * post方式请求
 * @param callback
 */
HttpUtil.prototype.post = function(callback) {
    this.responseDataType = checkIsNotNullOrEmpty(this.responseDataType) ? this.responseDataType : "json";
    $.ajax({
        method: "post",
        url: this.requestUrl,
        headers: checkIsNotNullOrEmpty(this.requestHeader) ? this.requestHeader : getDefaultHeaderParam(),
        dataType: this.responseDataType,
        async: checkIsNotNullOrEmpty(this.asyncValue) ? this.asyncValue : true,
        data: checkIsNotNullOrEmpty(this.requestParam) && this.responseDataType.indexOf("json") > -1
            ? JSON.stringify(this.requestParam)
            : !checkIsNotNullOrEmpty(this.requestParam) ? {} : this.requestParam,
        processData: $.isPlainObject(this.requestParam) ? false : true,
        cache: false,
        success: function (data) {
            callback(data);
        },
        error: function(msg) {
            callback(msg);
        }
    });
}
// 另一种方式的链式调用方法
/*
var HttpKit = {
    url: function (url) {
        this.requestUrl = url;
        return HttpKit;
    },
    param: function (param) {
        this.requestParam = param;  //this调用位置决定其词法作用域
        return HttpKit;
    },
    header: function (header) {
        this.requestHeader = header;
        return HttpKit;
    },
    isAsync: function (async) {
        this.asyncValue = async;
        return HttpKit;
    },
    dataType: function (dataType) {
        this.responseDataType = dataType;
        return HttpKit;
    },
    post: function (callback) {
        this.responseDataType = checkIsNullOrEmpty(this.responseDataType) ? this.responseDataType : "json";
        $.ajax({
            method: "post",
            url: this.requestUrl,
            headers: checkIsNullOrEmpty(this.requestHeader) ? this.requestHeader : {},
            dataType: this.responseDataType,
            async: checkIsNullOrEmpty(this.asyncValue) ? this.asyncValue : true,
            data: checkIsNullOrEmpty(this.requestParam) && this.responseDataType.indexOf("json") > -1 ? JSON.stringify(this.requestParam) : this.requestParam,
            processData: $.isPlainObject(this.requestParam) ? false : true,
            cache: false,
            success: function (data) {
                callback(msg);
            },
            error: function(msg) {
                callback(msg);
            }
        });
    },
    get: function (callback) {
        $.ajax({
            method: "get",
            url: this.requestUrl,
            headers: checkIsNullOrEmpty(this.requestHeader) ? this.requestHeader : {},
            dataType: this.responseDataType,
            async: checkIsNullOrEmpty(this.asyncValue) ? this.asyncValue : true,
            data: checkIsNullOrEmpty(this.requestParam) ? this.requestParam : "",
            processData: true,
            cache: false,
            success: function (data) {
                callback(data);
            },
            error: function(msg) {
                callback(msg);
            }
        });
    }
};
*/

//判断数据是否为Null或者undefined或者为空字符串
function checkIsNotNullOrEmpty(value) {
    //正则表达式用于判斷字符串是否全部由空格或换行符组成
    var reg = /^\s*$/
    //返回值为true表示不是空字符串
    return (value != null && value != undefined && !reg.test(value));
}

function getDefaultHeaderParam() {
    var headerParam = {
        "X-Api-Access-Key":"robot",
        "Content-Type":"application/json"
    };
    return headerParam;
}
