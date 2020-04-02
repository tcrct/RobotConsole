var operationLogTable;
layui.use(['table'],  function() {
    var table = layui.table;
    //转换静态表格
    operationLogTable = table.init('operation_log_table', {
        limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
        //支持所有基础参数
    });

    var userId = new Date().getTime();
    WebSocketKit.duang()
        .url(API.WS.PUSHLOG +"?userId="+userId+"&tokenId="+userId)
        .onMessage(function (pushLogDto) {
            addLog("operation_log_table", JSON.parse(pushLogDto));
    })
});

var operationLogTableDataArray = [];
function addLog(tableId, pushLogDto) {

    var cmdDesc = pushLogDto.cmd;
    var deviceName = pushLogDto.deviceName;
    var currentPosition = pushLogDto.currentPosition;
    var startPosition = pushLogDto.startPosition;
    var endPosition = pushLogDto.endPosition;
    var status = pushLogDto.status;
    var body = "";

    // 更新车辆列表里的当前位置显示
    updateVehicle(deviceName, status, currentPosition, endPosition);
    switch (cmdDesc) {
        case "上报RFID号":
            body = "车辆["+deviceName+"]行驶到达["+currentPosition+"]位置";
            break;
        case "下发路径指令":
            body = "车辆["+deviceName+"]接收到新的移动订单，从位置["+startPosition+"]移动到位置["+endPosition+"]"
            break;
        default :
            body = "";
    }

    var logData = {
        "time" : pushLogDto.time,
        "body" : body
    }

    var isArray = $.isArray(logData);
    var isPlainObject = $.isPlainObject(logData);
    if (!isArray && isPlainObject) {
        // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
        operationLogTableDataArray.unshift(logData);
    } else if (isArray) {
        operationLogTableDataArray =logData;
    } else {
        console.log("不支持的格式");
    }

    if (operationLogTableDataArray.length >= 100 ) {
        operationLogTableDataArray.splice(50, operationLogTableDataArray.length);
        console.log("日志记录行数超过100行，清空前50行！")
    }

    operationLogTable.reload(tableId, {data : operationLogTableDataArray});
}

function updateVehicle(deviceName, status, currentPosition, endPosition) {
    if (checkIsNotNullOrEmpty(currentPosition)) {
        $("#" + deviceName + "_vehicleList_currentPosition").text(currentPosition);
        $("#" + deviceName + "_component_currentPosition").text(currentPosition);
    }
    if (checkIsNotNullOrEmpty(status)) {
        $("#" + deviceName + "_vehicleList_state").text(status);
        $("#" + deviceName + "_component_state").text(status);
    }
    if (checkIsNotNullOrEmpty(endPosition)) {
        $("#" + deviceName + "_vehicleList_destPosition").text(endPosition);
    }
}