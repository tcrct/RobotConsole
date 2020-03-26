/**
 * ztree api文档： http://www.treejs.cn/v3/api.php
 */
var ztreeSetting = {
    treeId:"ztree_componentTree",
    async: {
        enable: true,
        url : API.TREE.CREATE_TREE,
        dataType : "json",
        contentType: "application/json",
        type:"post",
        headers: DEFAULT_HEADER,
        otherParam: createPostParam,
        dataFilter: ajaxDataFilter
    },
    data: {
        // 如果返回的json数据里的key与ztree规定的不一致，可以使用以下方法更改
        key : {
            name : "text"
        },
        simpleData: {
            enable: true,
            idKey : "id",
            pIdKey : "pid"
        }
    },
    callback: {
        onClick: onClick
    }
};

var zTree;
    $(document).ready(function(){
    zTree = $.fn.zTree.init($("#component_div"), ztreeSetting);
    // zTree.expandAll(true);
});

// ztree点击事件
var component_properties_table;
function onClick(event, treeId, treeNode, clickFlag) {
    var nodeParam = {
        "id": treeNode.id,
        "pid" : treeNode.pid,
        "type" : treeNode.getParentNode().type,
        "text" : treeNode.text
    };

    layui.use('table', function() {
        component_properties_table = layui.table;
        component_properties_table.render({
            id:"component_properties_table"
            ,elem: '#component_properties_table'
            ,url: API.MAIN.GET_COMPONENT_INFO
            ,method: 'post'
            ,contentType: 'application/json'
            ,dataType: 'json'
            ,headers: DEFAULT_HEADER
            ,where: nodeParam
            ,page: false
            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {field:'id', title: 'ID', hide:true}
                ,{field:'name', title: '属性'}
                ,{field:'value', title: '值'}
            ]]
            ,response: {
                statusCode: 0 //重新规定成功的状态码为 200，table 组件默认为 0
            }
            ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
                for(var i=0; i<res.data.length; i++) {
                    res.data[i].id=nodeParam.type+"_"+i;
                }
                return {
                    "code": res.head.code,
                    "msg": res.head.message,
                    // "count": res.data.totalCount,
                    "data": res.data //解析数据列表
                };
            }
        });
    });
}

// 提交参数
function createPostParam() {
    var param = {
        "strategyName":"ztree",
        "templateName":"opentcs_components",
        "isSimple": "true",
        "isNew":"false"
    }
    return param;
}
/**
 * 用于对 Ajax 返回数据进行预处理的函数。[setting.async.enable = true 时生效]
 * @param treeId JSON 对应 zTree 的 treeId，便于用户操控
 *@param parentNode 进行异步加载的父节点 JSON 数据对象 对根进行异步加载时，parentNode = null
 * @param 异步加载获取到的数据转换后的 Array(JSON) / JSON / String 数据对象 v3.4开始 支持 XML 数据格式的 String
 */
function ajaxDataFilter(treeId, parentNode, responseData) {
    if (responseData) {
      responseData = responseData.data.resultList;
    }
    setTimeout("expandNode()", 100);
    return responseData;
};

function expandNode() {
    var nodes = zTree.getNodes();
    zTree.expandNode(nodes[0], true, true, true);
    zTree.selectNode(nodes[0].children[0], false, false);
    onClick(null, "ztree_componentTree", nodes[0].children[0], null);
    setTimeout("aaa()", 1000);
}

function aaa() {
    var checkStatus = component_properties_table.checkStatus('component_properties_table')
    var data = checkStatus.data;

    console.log(JSON.stringify(data));
    // // console.log(component_properties_table);
    // //监听单元格编辑
    // component_properties_table.on('edit(component_properties_table)', function(obj){
    //     var value = obj.value //得到修改后的值
    //         ,data = obj.data //得到所在行所有键值
    //         ,field = obj.field; //得到字段
    //     layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
    // });
}