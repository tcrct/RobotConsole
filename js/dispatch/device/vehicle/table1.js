layui.use(['form', 'table'], function () {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        layuimini = layui.layuimini;


    table.render({
        elem: "#vehicle_table"
        ,url: API.VEHICLE.SEARCH
        ,header:DEFAULT_HEADER
        ,method: 'post'
        ,contentType: 'application/json'
        ,dataType: 'json'
        ,where: {}
        ,toolbar: '#vehicle_toolbar'
        ,defaultToolbar: ['filter', 'exports', 'print', {
            title: '提示',
            layEvent: 'LAYTABLE_TIPS',
            icon: 'layui-icon-tips'
        }]
        ,cols: [[
            {field:'id', title: 'id', hide:true}
            ,{field:'img', title: '图片'}
            ,{field:'name', width:180, title: '名称'}
            ,{field:'specs', width:180, title: '车身规格(长*宽*高)'}
            ,{field:'transportOrderId', width:180,title: '移动订单'}
            ,{field:'state', width:180, title: '状态', templet:function (row) {
                    if(row.state == "FINISHED") {
                        return "完成";
                    }
                }}
            ,{field:'startTime', width:180, title: '车辆属性', sort: true}
            ,{field:'endTime', width:180, title: '其它信息', templet:function (row) {
                var rowHtml= "当前点："+"  "+"<br>" +
                    "下一个点："+"  "+"<br>"+
                    "电量："+"  "+"<br>"+
                    "车头方向："+"  "+"<br>"+
                    "最大前进速度："+"  "+"<br>"+
                    "最大后退速度："+"  "+"<br>" +
                    "执行订单次数："+"  "+"<br>" +
                    "运行时间："+"  "+"<br>";
                return rowHtml;
            }}
            ,{title: '操作', width: 200, templet: '#vehicle_tableBar', fixed: "right", align: "center"}
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
        ,limit: 20
        ,page: true
    });


    //执行一个laydate实例
    laydate.render({
        elem: '#transportOrder_startEndTime' //指定元素
        ,type: 'datetime'
        ,range: '至'
        ,format: 'yyyy-MM-dd HH:mm:ss'
    });
    // laydate.render({
    //     elem: '#transportOrder_endTime' //指定元素
    //     ,type: 'datetime'
    // });

    // 初始化搜索车辆下拉框
    initSearchVehicleSelect(form);

    // 监听搜索操作
    form.on('submit(data-search-btn)', function (data) {
        var result = buildSearchItemDto(data.field, "transportOrder");
        if (isNotEmpty(result)) {
            var resultArray = [];
            for (var i = 0; i<result.length; i++ ) {
                var param = result[i];
                if (param.field == "startEndTime") {
                    if (isNotEmpty(param.value)) {
                        var valueArray = param.value.split("至");
                        var startTime = {
                            "field" : "startTime",
                            "operator" : ">=",
                            "value" : valueArray[0]
                        }
                        resultArray.push(startTime);
                        var endTime = {
                            "field" : "endTime",
                            "operator" : "<=",
                            "value" : valueArray[1]
                        }
                        resultArray.push(endTime);
                    }
                } else {
                    resultArray.push(param);
                }
            }
        }

        //执行搜索重载
        table.reload('vehicle_table', {
            page: {
                curr: 1
            }
            , header: DEFAULT_HEADER
            , where: {
                itemDtos: isEmpty(resultArray) ? null :resultArray
            }
        }, 'data');


        return false;
    });

    // 监听创建移动订单操作
    $(".data-add-btn").on("click", function () {
        var index = layer.open({
            title: '创建移动订单',
            type: 2,
            shade: 0.2,
            offset:'rb',
            maxmin:true,
            // 是否点击遮罩关闭
            shadeClose: false,
            area: ['50%', '100%'],
            content: '/page/dispatch/order/add.html',
        });
        $(window).on("resize", function () {
            layer.full(index);
        });

        return false;
    });

    // 监听删除操作
    $(".data-delete-btn").on("click", function () {
        var checkStatus = table.checkStatus('currentTableId')
            , data = checkStatus.data;
        layer.alert(JSON.stringify(data));
    });

    //监听表格复选框选择
    table.on('checkbox(vehicle_table)', function (obj) {
        console.log(obj)
    });

    table.on('tool(vehicle_table)', function (obj) {
        var data = obj.data;
        if (obj.event === 'edit') {
            // 将选中的行id对象设置到隐藏域，再由弹窗页取出值
            $("#vehicle_table_selected_id").val(data.id);
            var index = layer.open({
                title: '查看订单',
                type: 2,
                shade: 0.2,
                offset:'rb',
                maxmin:true,
                // 是否点击遮罩关闭
                shadeClose: false,
                area: ['50%', '100%'],
                btn: ["关闭"],
                content: './form.html'
            });
            $(window).on("resize", function () {
                layer.full(index);
            });
            return false;
        } else if (obj.event === 'delete') {
            layer.confirm('真的删除行么', function (index) {
                obj.del();
                layer.close(index);
            });
        }
    });

});

function initSearchVehicleSelect(form) {
    HttpKit.duang().url(API.MAIN.VEHICLE_LIST).header(DEFAULT_HEADER).post(function (result) {
        var data = result.data;
        var optionHtml = "<option value=''>请选择</option>";
        for (var i=0; i<data.length; i++) {
            optionHtml += "<option value='"+data[i].vehicleName+"'>" + data[i].vehicleName + "</option>";
        }
        // console.log(optionHtml)
        $("#vehicle_executeVehicle").html(optionHtml);
        form.render('select', "vehicle_executeVehicle"); //刷新select选择框渲染
    });
}