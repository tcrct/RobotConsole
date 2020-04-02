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