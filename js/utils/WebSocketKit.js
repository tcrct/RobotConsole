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
var WebSocketKit = {
    duang: function () {
        return new WebSocketUtil();
    }
}
var websocket;
// 定义WebSocketUtill对象
var WebSocketUtil = function() {};

/**
 * 请求地址
 * @param url
 * @returns {HttpUtil}
 */
WebSocketUtil.prototype.url = function(url) {
    this.wsUrl = url;
    //如果浏览器支持WebSocket
    if(window.WebSocket) {
        websocket = new WebSocket(this.wsUrl);  //获得WebSocket对象
        //连接打开的时候触发
        websocket.onopen = function(event){
            console.log("建立["+url.substr(0, url.indexOf("?"))+"]连接成功");
        }
    }
    return this;
}

/**
 * 接收到推送消息
 * @param callback 回调函数
 * @returns
 */
WebSocketUtil.prototype.onMessage = function (callback) {
    websocket.onmessage = function(event){
        callback(event.data);
    }
}

