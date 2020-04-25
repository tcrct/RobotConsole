var endPoint  = "http://192.168.8.212:55200";
var wsEndPoint =  "ws://192.168.8.212:55200";
// 默认的header头信息
var DEFAULT_HEADER = {"X-Api-Access-Key":"robot", "Content-Type":"application/json"};

var API = {
    // WS的只能是一级目录??
    WS :{
        PUSHLOG: wsEndPoint + "/pushlog"
    },
    TRANSPORT_ORDER: {
        SEARCH: endPoint + "/order/search",
        FIND_BY_ID: endPoint + "/order/findbyid"
    },
    LOGIN: {
        IN: endPoint + "/login/in",
        OUT: endPoint + "/login/out"
    },
    MAIN : {
        GET_COMPONENT_INFO : endPoint + "/main/component/info",
        VEHICLE_LIST : endPoint + "/vehicle/list"
    },
    TREE : {
        CREATE_TREE : endPoint +"/tree/create",
        GET_TREE_INFO : endPoint + "/tree/info"
    },
    TASK : {
        GET_TASK_SEARCH : endPoint + "/task/search",
        TASK_SAVE : endPoint + "/task/save"
    },
};

