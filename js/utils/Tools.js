/**
 * 将表单数据转换为SearchItemDtos
 *
 * @param data 搜索表单的数据
 * @param entityName 实体类(表)名
 */
function buildSearchItemDto(data, entityName) {
    var itemDtoArray = []
    for (var fieldName in data) {
        var fieldValue = data[fieldName];
        if (isEmpty(fieldValue)) {
            continue;
        }
        // 需要在input里设置operator属性，input的id值为entityName+"_"+fieldName
        var operator = $("#"+entityName+"_"+fieldName).attr("operator");
        if (isEmpty(operator))  {
            operator = "==";
        }
        var param = {
            "field" : fieldName,
            "operator": operator,
            "value": fieldValue
        }
        itemDtoArray.push(param);
    }
    return itemDtoArray;
}

function isEmpty(value) {
    return value === null || typeof(value) == "undefined" || value=="";
}

function isNotEmpty(value) {
    return !isEmpty(value);
}

function timeDiff(startTimeStr, endTimeStr) {
    var startTime = new Date(startTimeStr.replace(/\-/g, "/"));
    var endTime = new Date(endTimeStr.replace(/\-/g, "/"));
    var deffTime=endTime.getTime()-startTime.getTime(); //时间差秒
    //计算出相差天数
    var days=Math.floor(deffTime/(24*3600*1000));
    //计算出小时数
    var leave1=deffTime%(24*3600*1000);  //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000));
    //计算相差分钟数
    var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000));
    //计算相差秒数
    var leave3=leave2%(60*1000);   //计算分钟数后剩余的毫秒数
    var seconds=Math.round(leave3/1000);
    var diffTimeStr = "";
    if (days >0) {
        diffTimeStr = days + "天";
    }
    if (hours >0) {
        diffTimeStr += hours + "时";
    }
    if (minutes >0) {
        diffTimeStr += minutes + "分";
    }
    if (seconds >0) {
        diffTimeStr += seconds + "秒";
    }
    return diffTimeStr;
}