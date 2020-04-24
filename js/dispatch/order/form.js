var transportOrderTableResponseData;
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
        transportOrderTableResponseData = data;
        form.val('transportOrderForm', data);
        initHistorys(table, data)
        initDestination(table, data);
        var stepLength = initRouteEntity(table,data);
        initTips(data, stepLength);
    });
});

// 顶部提示信息
function initTips(data, stepLength) {
    var transportOrderTips = "该订单在车辆"+data.executeVehicle+"上执行，" +
        "执行时间为"+data.startTime+" ~ "+data.endTime+"，" +
        "执行状态为："+data.state+"！";
    transportOrderTips += "<br/>订单从位置"+data.sourceName+"开始，共移动"+stepLength+"个位置到达"+data.destName+"，" +
        "共耗时："+timeDiff(data.startTime, data.endTime);
    $("#transportOrder_tips").html(transportOrderTips);
}

// 显示订单历史记录
function initHistorys(table, data) {
    if (isEmpty(data.historys)) {
        return;
    }
    table.init("transportOrderHistorys_table",{
        data: data.historys
    });
}

// 初始化显示子订单
function initDestination(table, data) {
    var destinationArray = isEmpty(data.driveOrderEntities) ? null : data.driveOrderEntities;
    if (isEmpty(destinationArray)) {
        return;
    }
    var array = [];
    for (var i = 0; i < destinationArray.length; i++) {
        var destination = destinationArray[i].destination;
        destination.state = destinationArray[i].state
        destination.index = i;
        array.push(destination);
    }
    var length = (8- destinationArray.length);
    for(var i=1; i<length; i++) {
        array.push({"index":"","destName":"&nbsp;", "operation":"&nbsp;","state":"&nbsp;"});
    }
    table.init("transportOrderDestination_table",{
        data: array
    });

    //监听行单击事件（双击事件为：rowDouble）
    table.on('row(transportOrderDestination_table)', function(obj){
        var data = obj.data;
        var index = data.index;

        // layer.alert(JSON.stringify(data), {
        //     title: '当前行数据：'
        // });

        // 点击移动子订单后，同步更新显示子订单的路由信息
        var stepList = getRouteEntityStepList(table, transportOrderTableResponseData, index);
        table.reload("transportOrderRouteEntity_table",{
            data: stepList
        });
        initTips(transportOrderTableResponseData, stepList.length);

        //标注选中样式
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
    });
}

// 路由步骤信息
function initRouteEntity(table, data) {
    var stepList = getRouteEntityStepList(table, data, 0);
    table.init("transportOrderRouteEntity_table",{
        data: stepList
    });
    return stepList.length;
}

/**
 * 根据下标取出订单路由对象
 *
 * @param table 表容器
 * @param data json数据对象
 * @param index 下标
 * @returns {*}
 */
function getRouteEntityStepList(table, data, index) {
    var routeEntity = isEmpty(data.driveOrderEntities[index]) ? null : data.driveOrderEntities[index].routeEntity;
    if (isEmpty(routeEntity) || isEmpty(routeEntity.stepList)) {
        return;
    }
   return routeEntity.stepList;
}