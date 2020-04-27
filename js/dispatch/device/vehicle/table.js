HttpKit.duang()
    .url(API.MAIN.VEHICLE_LIST)
    .header(DEFAULT_HEADER)
    .post(function (responseData) {
        createVehicleSimpleList(responseData);
    });

// 创建车辆列表
function createVehicleSimpleList(responseData) {
    if (responseData.head.code != 0) {
        console.log("没有车辆");
        return;
    }
    var data = responseData.data;
    var divHtml = "";
    for (var i=0; i<data.length; i++) {
        var vehicle = data[i];

        divHtml += '<div class="layui-col-md4 layui-col-sm6">'+
            '<div class="layadmin-contact-box" >'+
                '<div class="layui-col-md4 layui-col-sm6">'+
                    '<a href="javascript:;">'+
                        '<div class="layadmin-text-center">'+
                            '<img src="../../../../images/Method01.png">'+
                        '</div>'+
                    '</a>'+
                '</div>'+
                '<div class="layui-col-md8 layadmin-padding-left20 layui-col-sm6">'+
                    '<a href="javascript:;">'+
                        '<h3 class="layadmin-title"><strong>'+vehicle.vehicleName+'</strong></h3>'+
                        '<p class="layadmin-textimg"><i class="layui-icon layui-icon-location"></i>'+
                        '<strong>'+vehicle.state+'</strong>'+
                        '</p>'+
                    '</a>'+
                    '<div class="layadmin-address">'+
                        '<a href="javascript:;">'+
                            '车身规格：123*456*789mm<br>'+
                            '<span>电量：'+vehicle.energyLevel+'%</span>'+
                            '<span style="padding-left: 20px">集成等级: '+vehicle.integrationLevel+'</span>'+
                            '<br>' +
                            '<span>当前位置：'+vehicle.currentPosition+'</span>' +
                            '<span style="padding-left: 20px">下一位置：'+(isEmpty(vehicle.nextPosition) ? '' : vehicle.nextPosition)+'</span>'+
                            '<br>'+
                            '<span>最大前进速度：'+vehicle.maxFwdVelocity+'/mm</span>'+
                            '<span style="padding-left: 20px">最大后退速度：'+vehicle.maxRevVelocity+'/mm</span>'+
                            '<br>'+
                            '<p>其它属性：</p>'+
                                createPropertiesSpan(vehicle)+
                        '</a>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    }
    $("#vehicle_table").html(divHtml);
}

function createPropertiesSpan(vehicle) {
    var properties = vehicle.properties;
    if (isEmpty(properties)) {
        return "";
    }
    var html = "";
    for (var key in properties) {
        if (key == "host" || key == "port") {
            html += '<span style="padding-right: 20px">' + key + ' : ' + properties[key] + '</span>';
        }
    }
    return html;
}