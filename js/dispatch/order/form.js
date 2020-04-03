layui.use(['form', 'table', 'laydate'], function () {
    var form = layui.form,
        table = layui.table,
        laydate = layui.laydate;

    // 取父级iframe里的隐藏文本域里的id值
    var param = {
      id: parent.$('#transportOrder_table_selected_id').val()
    };
    //表单初始赋值
    HttpKit.duang().url(API.TRANSPORT_ORDER.FIND_BY_ID).header(DEFAULT_HEADER).param(param).get( function (responseResule) {
        var data = responseResule.data;
        if (isEmpty(data)) {
            return;
        }
        form.val('transportOrderForm', data);
        initHistorys(table, data)
        initDestination(table, data);
        var stepLength = initRouteEntity(table,data);
        initTips(data, stepLength);


    });

});
function initTips(data, stepLength) {
    var transportOrderTips = "该订单在车辆"+data.executeVehicle+"上执行，" +
        "执行时间为"+data.startTime+" ~ "+data.endTime+"，" +
        "执行状态为："+data.state+"！";
    transportOrderTips += "<br/>订单从位置"+data.sourceName+"开始，共移动"+stepLength+"个位置到达"+data.destName+"，" +
        "共耗时："+timeDiff(data.startTime, data.endTime);
    $("#transportOrder_tips").html(transportOrderTips);
}
function initHistorys(table, data) {
    if (isEmpty(data.historys)) {
        return;
    }
    table.init("transportOrderHistorys_table",{
        data: data.historys
    });
}
//
function initDestination(table, data) {
   var destination =  isEmpty(data.driveOrderEntities[0]) ? null : data.driveOrderEntities[0].destination;
    if (isEmpty(destination)) {
        return;
    }
    var length = (8- data.driveOrderEntities.length);
    var array =  [];
    destination.state = data.state
    array.push(destination);
    for(var i=1; i<length; i++) {
        array.push({"destName":"&nbsp;", "operation":"&nbsp;","state":"&nbsp;"});
    }
    table.init("transportOrderDestination_table",{
        data: array
    });
}

function initRouteEntity(table, data) {
    var routeEntity = isEmpty(data.driveOrderEntities[0]) ? null : data.driveOrderEntities[0].routeEntity;
    if (isEmpty(routeEntity.stepList)) {
        return;
    }
    table.init("transportOrderRouteEntity_table",{
        data: routeEntity.stepList
    });
    return routeEntity.stepList.length;
}