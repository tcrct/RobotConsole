var endPoint  = "http://127.0.0.01:55200";
var wsEndPoint =  "ws://127.0.0.01:55200";
// 默认的header头信息
var DEFAULT_HEADER = {"X-Api-Access-Key":"robot", "Content-Type":"application/json"};

var API = {
    TRANSPORT_ORDER: {
        SEARCH: endPoint + "/order/search"
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
    }
};

