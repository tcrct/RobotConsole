var endPoint  = "http://127.0.0.01:55200";
var wsEndPoint =  "ws://127.0.0.01:55200";

var API = {
    LOGIN: {
        IN: endPoint + "/login/in",
        OUT: endPoint + "/login/out"
    },
    TREE : {
        CREATE_TREE : endPoint +"/tree/create",
        GET_TREE_INFO : endPoint + "/tree/info"
    }
};

