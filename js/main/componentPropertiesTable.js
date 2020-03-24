layui.use('table', function(){
    var table = layui.table;

    table.render({
        elem: '#component_properties_table'
        //,url:'/demo/table/user/'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
            {field:'attribute', title: '属性'}
            ,{field:'value', title: '值'}
        ]]
        ,data: [{
            "attribute":"name"
            ,"value": "A001"
        },{
            "attribute":"X坐标"
            ,"value": "123"
        },{
            "attribute":"Y坐标"
            ,"value": "321"
        },{
            "attribute":"Y坐标"
            ,"value": "321"
        },{
            "attribute":"Y坐标"
            ,"value": "321"
        },{
            "attribute":"Y坐标"
            ,"value": "321"
        },{
            "attribute":"Y坐标"
            ,"value": "321"
        },{
            "attribute":"Y坐标"
            ,"value": "321"
        },{
            "attribute":"Y坐标"
            ,"value": "321"
        },{
            "attribute":"Y坐标"
            ,"value": "321"
        }]
    });
});