layui.use(['table', 'element'],  function(){
    var table = layui.table;
    var element = layui.element;
    var elem = "";
    var whereParam;
    element.on('tab(transportOrderTabBrief)', function(tabs){
        if (tabs.index== 0) {
            elem = "#order_progress_table";
            whereParam = {"state": "BIGIN_PROGRESS"};
        } else if (tabs.index == 1) {
            elem = "#order_finished_table";
            whereParam = {"state": "FINISHED"}
        }
    });


    table.render({
        elem: elem
        ,url: API.TRANSPORT_ORDER.SEARCH
        ,header:DEFAULT_HEADER
        ,method: 'post'
        ,contentType: 'application/json'
        ,dataType: 'json'
        ,where: whereParam
        ,cols: [[
            {field:'id', title: 'id', hide:true}
            ,{field:'orderId', width:330, title: '订单id'}
            ,{field:'sourceName', width:180, title: '起始位置'}
            ,{field:'destName', width:180, title: '目标位置'}
            ,{field:'executeVehicle', width:180,title: '执行车辆'}
            ,{field:'state', width:180, title: '状态'}
            ,{field:'startTime', width:180, title: '开始时间', sort: true}
            ,{field:'endTime', width:180, title: '结束时间'}
        ]]
        ,response: {
            statusCode: 0 //重新规定成功的状态码为 200，table 组件默认为 0
        }
        ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
            return {
                "code": res.head.code,
                "msg": res.head.message,
                "count": res.data.totalCount,
                "data": res.data.result //解析数据列表
            };
        }
        ,page: true
    });
});