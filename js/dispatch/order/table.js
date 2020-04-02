layui.use(['form', 'table', 'laydate'], function () {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        laydate = layui.laydate,
        layuimini = layui.layuimini;


    //执行一个laydate实例
    laydate.render({
        elem: '#transportOrder_startTime' //指定元素
        ,type: 'datetime'
    });
    laydate.render({
        elem: '#transportOrder_endTime' //指定元素
        ,type: 'datetime'
    });

    // 初始化搜索车辆下拉框
    initSearchVehicleSelect(form);

    // 监听搜索操作
    form.on('submit(data-search-btn)', function (data) {
        var result = buildSearchItemDto(data.field, "transportOrder");
        console.log(result);
        // var result = JSON.stringify(data.field);
        // layer.alert(result, {
        //     title: '最终的搜索信息'
        // });

        //执行搜索重载
        table.reload('transportOrder_table', {
            page: {
                curr: 1
            }
            ,header: DEFAULT_HEADER
            , where: {
                itemDtos: result
            }
        }, 'data');

        return false;
    });

    // 监听添加操作
    $(".data-add-btn").on("click", function () {
        var index = layer.open({
            title: '添加用户',
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
    table.on('checkbox(transportOrder_table)', function (obj) {
        console.log(obj)
    });

    table.on('tool(transportOrder_table)', function (obj) {
        var data = obj.data;
        if (obj.event === 'edit') {

            var index = layer.open({
                title: '编辑用户',
                type: 2,
                shade: 0.2,
                maxmin:true,
                shadeClose: true,
                area: ['100%', '100%'],
                content: '/page/table/edit.html',
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
            optionHtml += "<option value='"+data[i].id+"'>" + data[i].vehicleName + "</option>";
        }
        // console.log(optionHtml)
        $("#transportOrder_executeVehicle").html(optionHtml);
        form.render('select', "transportOrder_executeVehicle"); //刷新select选择框渲染
    });
}