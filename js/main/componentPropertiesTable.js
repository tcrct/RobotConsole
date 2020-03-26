layui.use('table', function(){
    var table = layui.table;

    table.render({
        elem: '#component_properties_table'
        //,url:'/demo/table/user/'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
            {field:'name', title: '属性'}
            ,{field:'value', title: '值'}
        ]]
        ,data: [{
            "name":"name"
            ,"value": "A001"
        },{
            "name":"X坐标"
            ,"value": "123"
        },{
            "name":"Y坐标"
            ,"value": "321"
        },{
            "name":"Y坐标"
            ,"value": "321"
        },{
            "name":"Y坐标"
            ,"value": "321"
        },{
            "name":"Y坐标"
            ,"value": "321"
        },{
            "name":"Y坐标"
            ,"value": "321"
        },{
            "name":"Y坐标"
            ,"value": "321"
        },{
            "name":"Y坐标"
            ,"value": "321"
        },{
            "name":"Y坐标"
            ,"value": "321"
        }]
    });
});