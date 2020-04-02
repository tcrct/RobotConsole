layui.use(['table'],  function(){
    var table = layui.table;
    table.render({
        elem: "#transportOrder_table"
        ,url: API.TRANSPORT_ORDER.SEARCH
        ,header:DEFAULT_HEADER
        ,method: 'post'
        ,contentType: 'application/json'
        ,dataType: 'json'
        ,where: {}
        ,cols: [[
            {field:'id', title: 'id', hide:true}
            ,{field:'orderId', title: '订单id'}
            ,{field:'sourceName', width:180, title: '起始位置'}
            ,{field:'destName', width:180, title: '目标位置'}
            ,{field:'executeVehicle', width:180,title: '执行车辆'}
            ,{field:'state', width:180, title: '状态', templet:function (row) {
                if(row.state == "FINISHED") {
                    return "完成";
                }
             }}
            ,{field:'startTime', width:180, title: '开始时间', sort: true}
            ,{field:'endTime', width:180, title: '结束时间'}
        ]]
        ,request: {
            pageName: 'pageNo' //页码的参数名称，默认：page
            ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
        }
        ,response: {
            statusCode: 0 //重新规定成功的状态码为 200，table 组件默认为 0
        }
        ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
            return {
                "code": res.head.code,
                "msg": res.head.message,
                "count": isEmpty(res.data) ? 0 : res.data.totalCount,
                "data": isEmpty(res.data) ? null : res.data.result //解析数据列表
            };
        }
        ,limits: [10, 15, 20, 25, 50, 100]
        ,limit: 10
        ,page: true
    });
});