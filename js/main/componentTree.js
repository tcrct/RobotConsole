var ztreeSetting = {
    async: {
        enable: true,
        url : createPostParam("http://127.0.0.1:55200/tree/create"),
        dataType : "text",
        type:"get",
        headers: {"X-Api-Access-Key":"robot", "Content-Type":"application/json"}
    },
    callback: {
        onClick: onClick
    }
};

// var zNodes =[
//     { id:1, pId:0, name:"父节点1 - 展开", open:true, type:"point"},
//     { id:11, pId:1, name:"父节点11 - 折叠", type:"point"},
//     { id:111, pId:11, name:"叶子节点111"},
//     { id:112, pId:11, name:"叶子节点112"},
//     { id:113, pId:11, name:"叶子节点113"},
//     { id:114, pId:11, name:"叶子节点114"},
//     { id:12, pId:1, name:"父节点12 - 折叠"},
//     { id:121, pId:12, name:"叶子节点121"},
//     { id:122, pId:12, name:"叶子节点122"},
//     { id:123, pId:12, name:"叶子节点123"},
//     { id:124, pId:12, name:"叶子节点124"},
//     { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
//     { id:2, pId:0, name:"父节点2 - 折叠"},
//     { id:21, pId:2, name:"父节点21 - 展开", open:true},
//     { id:211, pId:21, name:"叶子节点211"},
//     { id:212, pId:21, name:"叶子节点212"},
//     { id:213, pId:21, name:"叶子节点213"},
//     { id:214, pId:21, name:"叶子节点214"},
//     { id:22, pId:2, name:"父节点22 - 折叠"},
//     { id:221, pId:22, name:"叶子节点221"},
//     { id:222, pId:22, name:"叶子节点222"},
//     { id:223, pId:22, name:"叶子节点223"},
//     { id:224, pId:22, name:"叶子节点224"},
//     { id:23, pId:2, name:"父节点23 - 折叠"},
//     { id:231, pId:23, name:"叶子节点231"},
//     { id:232, pId:23, name:"叶子节点232"},
//     { id:233, pId:23, name:"叶子节点233"},
//     { id:234, pId:23, name:"叶子节点234"},
//     { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
// ];

// var zNodes =[
//     { name:"车辆", open:true, type:"vehicle",
//         children: [
//             { name:"A001", id:""},
//             { name:"A002"},
//             { name:"A003"},
//             { name:"A004"}
//         ]},
//     { name:"图层", type:"map",
//         children: [
//             { name:"点", open:true, type:"point",
//                 children: [
//                     { name:"1"},
//                     { name:"2"},
//                     { name:"3"},
//                     { name:"4"}
//                 ]},
//             { name:"路径", open:true, type:"path",
//                 children: [
//                     { name:"1 --- 2"},
//                     { name:"2 --- 3"},
//                     { name:"3 --- 4"},
//                     { name:"4 --- 3"},
//                 ]},
//             { name:"工站位置", open:true, type:"location",
//                 children: [
//                     { name:"Location-0001"},
//                     { name:"Location-0002"},
//                     { name:"Location-0003"},
//                     { name:"Location-0004"}
//                 ]}
//         ]}
// ];
$(document).ready(function(){
    var zTree = $.fn.zTree.init($("#component_div"), ztreeSetting);
    zTree.expandAll(true);
});

// ztree点击事件
function onClick(event, treeId, treeNode, clickFlag) {
    console.log(treeNode.getParentNode().type +"          "+treeNode.name);
}

// 提交参数
function createPostParam(url) {
    var param = {
        "strategyName":"ztree",
        "templateName":"opentcs_components",
        "isSimple": "true",
        "isNew":"false"
    }
    url = url +"?"+$.param(param);
    console.log(url)
    return url;
}