var ztreeSetting = {
};

var zNodes =[
    { name:"车辆", open:true,
        children: [
            { name:"A001"},
            { name:"A002"},
            { name:"A003"},
            { name:"A004"}
        ]},
    { name:"图层",
        children: [
            { name:"点", open:true,
                children: [
                    { name:"1"},
                    { name:"2"},
                    { name:"3"},
                    { name:"4"}
                ]},
            { name:"路径", open:true,
                children: [
                    { name:"1 --- 2"},
                    { name:"2 --- 3"},
                    { name:"3 --- 4"},
                    { name:"4 --- 3"},
                ]},
            { name:"工站位置",
                children: [
                    { name:"Location-0001"},
                    { name:"Location-0002"},
                    { name:"Location-0003"},
                    { name:"Location-0004"}
                ]}
        ]}
];
$(document).ready(function(){
    var zTree = $.fn.zTree.init($("#component_div"), ztreeSetting, zNodes);
    zTree.expandAll(true);
});