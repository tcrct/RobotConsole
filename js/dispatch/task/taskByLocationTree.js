/**
 * ztree api文档： http://www.treejs.cn/v3/api.php
 */
var ztreeSetting = {
    treeId:"ztree_task_location",
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
    zTree = $.fn.zTree.init($("#task_location_div"), ztreeSetting);
    // zTree.expandAll(true);
});

// ztree点击事件
var task_summary_table;
function onClick(event, treeId, treeNode, clickFlag) {

    if (treeNode.pid == rootNodeId) {
        return;
    }

    if (treeNode.text == "NOP") {
        layer.alert('该工站下没有设置任务');
        document.getElementById("taskItemForm").reset();
        $("#task_summary_table_tbody").html("");
        return;
    }

    document.getElementById("taskItemForm").reset();
    $("#task_summary_table_tbody").html("");

    var nodeParam = {
        "pageNo": 0,
        "pageSize": 10,
        "itemDtos" : [{
            "field": "actionKey",
            "operator": "==",
            "value": treeNode.text
        }],
        "operator" : "and"
    };

    HttpKit.duang()
        .url(API.TASK.GET_TASK_SEARCH)
        .param(nodeParam)
        .header(DEFAULT_HEADER)
        .post(function (responseData) {
            createTaskSummaryTable(responseData);
        });
}

// 动作概述表格
function createTaskSummaryTable(responseData) {
    if (0 !=  responseData.head.code) {
        return;
    }
    var dataResult = responseData.data.result;
    var divHtml = "";
    for (var i=0; i<dataResult.length; i++) {
        var data = dataResult[i];
        var rowHtml = "关联工站：<strong>"+data.relationLocation+"</strong>"+
                            "<br>"+
                            "关联车辆：<strong>"+data.relationVehicle+"</strong>"+
                            "<br>"+
                            "<span>指令次数：<strong>"+data.actionItemList.length+"</strong></span>"+
                            "<span style='padding-left: 20px;'>"+
                            "执行时间：<strong>123 ms</strong></span>"+
                            "<br>"+
                            "<hr class='layui-bg-red'>"+
                            "说明："+ data.desc;

    divHtml += "<tr><td>"+data.actionKey+"</td><td>"+rowHtml+"</td>";

    }

    $("#task_summary_table_tbody").html(divHtml);
    $("#task_tips").html(dataResult[0].desc);
    $("#actionKeySpan").html(dataResult[0].actionKey);

    //设置任务详细信息
    setTaskActionInfo(dataResult);

    $("#addLocationAction").click(function () {
        addLocationAction();
    });
}
var taskActionTable;
var taskActionForm;
//设置任务详细信息
function setTaskActionInfo(dataResult) {

  // 动作指令列表
    var resultArray = new Array();
    var dataItemArray = dataResult[0].actionItemList;
    for (var i=0; i<dataItemArray.length; i++){
        var param = dataItemArray[i];
        param.nums = i+1;
        resultArray.push(param);
    }

    //执行次数
    $("#actionItemListSize").val(dataItemArray.length);

    layui.use(['form', 'table'], function () {
        var form = layui.form,
            table = layui.table;
        taskActionTable = table;
        taskActionForm = form;
        // 基础信息
        form.val('taskItemForm', dataResult[0]);

        // 动作指令列表
        table.render({
            id:"task_action_table"
            ,elem: '#task_action_table'
            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                ,{field:'nums', title: '次序', width:60}
                ,{field:'deviceId', title: '关联车辆/设备名称' , width:200, edit:'text'}
                ,{field:'direction', title: '动作方向', width:100, edit:'text'}
                ,{field:'cmdKey', title: '动作指令', width:100, edit:'text'}
                ,{field:'param', title: '动作参数', width:200, edit:'text'}
                ,{field:'desc', title: '动作说明', edit:'text'}
                ,{title: '操作', templet:"#task_action_table_tableBar",width:120, fixed: "right", align: "center"}
            ]]
            ,limit: 50
            ,data: resultArray
        });
        //监听单元格编辑
        table.on('edit(task_action_table)', function(obj){
            var value = obj.value //得到修改后的值
                ,data = obj.data //得到所在行所有键值
                ,field = obj.field; //得到字段
           console.log('[nums: '+ data.nums +'] ' + field + ' 字段更改为：'+ value);
        });

        //监听工具条
        table.on('tool(task_action_table)', function(obj){ //注：tool 是工具条事件名，task_action_table 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

            if(layEvent === 'detail'){ //查看
                //do somehing
            } else if(layEvent === 'delete'){ //删除
                layer.confirm('真的删除行么', function(index){
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);
                    // var addData = layui.table.cache['task_action_table'];
                    //向服务端发送删除指令
                });
            } else if(layEvent === 'edit'){ //编辑
                var data = form.val('taskItemForm');
                alert(JSON.stringify(data));
            } else if(layEvent === 'LAYTABLE_TIPS'){
                layer.alert('Hi，头部工具栏扩展的右侧图标。');
            }
        });
    });
}

//表单取值
layui.$('#taskSave').on('click', function() {
    var taskItemForm = taskActionForm.val('taskItemForm');
    var table = layui.table.cache['task_action_table'];

    var actionItemArray = new Array();
    for (var i=0; i<table.length; i++) {
        var data = table[i];
        if (isEmpty(data)) {
            continue;
        }
        var param = {
            "deviceId"  : data.deviceId,
            "cmdKey"  : data.cmdKey,
            "param"  : data.param,
            "desc" : data.desc,
            "direction" :data.direction
        }
        actionItemArray.push(param);
    }
    taskItemForm["actionItemList"] = actionItemArray;
    // console.log(JSON.stringify(taskItemForm));
    HttpKit.duang()
        .url(API.TASK.TASK_SAVE)
        .param(taskItemForm)
        .header(DEFAULT_HEADER)
        .post(function (responseData) {
            console.log(API.TASK.TASK_SAVE);
        });
});

function addLocationAction() {
    var addData = layui.table.cache['task_action_table'];
    var addDataArray = [];
    for (var i=0;i<addData.length;i++) {
        var tmp = addData[i];
        if (isEmpty(tmp.cmdKey) && isEmpty(tmp.deviceId)  && isEmpty(tmp.param)) {
            continue;
        }
        addDataArray.push(tmp);
    }

    var nums = addDataArray.length+1;
    addDataArray.push(
        {
            "nums": nums,
            "deviceId" :"",
            "direction":"",
            "cmdKey":"",
            "param":"",
            "desc":""
        }
    );
    taskActionTable.reload("task_action_table", {
        data: addDataArray
    })
}

// 提交参数
function createPostParam() {
    var param = {
        "strategyName":"ztree",
        "templateName":"task",
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

var rootNodeId;
function expandNode() {
    var rootNode = zTree.getNodes()[0];
    rootNodeId = rootNode.id;
    var nodes = zTree.getNodes()[0].children;
    // zTree.expandNode(nodes[0], true, true, true);
    // console.log(nodes[0].children[0])
    zTree.selectNode(nodes[0].children[0], true, true);
    // zTree.selectNode(nodes[0], true, true);
    setTimeout(function () {
        onClick(null, "ztree_task_location", nodes[0].children[0], null);
    }, 200);
}

