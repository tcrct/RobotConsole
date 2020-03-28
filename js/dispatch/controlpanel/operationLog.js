var operationLogTable;
layui.use(['table'],  function() {
    var table = layui.table;
    //转换静态表格
    operationLogTable = table.init('operation_log_table', {
        limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
        //支持所有基础参数
    });

    setTimeout(function () {
        var logData={
            "time":"2020-03-28 10:55:44",
            "deviceId":"A001",
            "operationLog":"车辆 A003 到达 点 100，正在执行工站操作，等待完成！"
        }
        addLog("operation_log_table", logData);
    }, 2000);

});

var operationLogTableDataArray = [];
function addLog(tableId, logData) {
    // layui.use(['table'],  function() {
    //     var operationLogTable = layui.table;
    //     operationLogTable.reload(tableId, {data : logDataArray});
    // });
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

    setTimeout(function () {
        var logData={
            "time":new Date(),
            "deviceId":"A001",
            "operationLog":"车辆 A003 到达 点 100，正在执行工站操作，等待完成！"
        }
        addLog("operation_log_table", logData);
    }, 1000);
}