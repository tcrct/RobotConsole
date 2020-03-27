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
        divHtml += "<div class='layui-col-md12' style='padding-top:10px;padding-bottom: 10px'>" +
            "<div class='layadmin-contact-box'>" +
            "   <div class='layui-col-md6' style='padding-top: 10px; text-align: center'>" +
            "       <a href='javascript:;'>" +
            "           <div class='layui-inline'><img src='"+vehicle.img+"' class='layui-circle' style='width: 128px; height: 128px'></div>" +
            "       </a>" +
            "    </div>" +
            "    <div class='layui-col-md6'>" +
            "       <p class='layadmin-textimg'>名称：<strong>"+vehicle.vehicleName+"</strong></p>" +
            "       <p class='layadmin-textimg'>电量：<strong>"+vehicle.energyLevel+"%</strong></p>" +
            "       <p class='layadmin-textimg'>集成等级：<strong>"+vehicle.integrationLevel+"</strong></p>" +
            "       <p class='layadmin-textimg'>当前位置：<strong>"+vehicle.currentPosition+"</strong></p>" +
            "       <p class='layadmin-textimg'>状态：<strong>"+vehicle.state+"</strong></p>" +
            "       <p class='layadmin-textimg'>目的地：<strong>"+ ((undefined == vehicle.destPosition) ? "未知" : vehicle.destPosition) +"</strong></p>" +
            "     </div>" +
            "   </div>" +
            "</div>"
    }
    $("#vehicleListDiv").html(divHtml);
}