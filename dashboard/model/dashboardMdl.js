(function() {
    'use strict';


    function factory($http) {
        var model = {},
            array;
        model.init = function() {
            //svc
            model.array = [{
                    Table: "NO-SERVICE FROM LAST 1 MONTH",
                    headertext: "Last Service Date",
                    text: "310910220 Service In 20-08-1992",
                    imgurl: "src/images/profilepic.png"
                },
                {
                    Table: "NEAR BY OFFLINE EXPIRY",
                    headertext: "NEAR BY OFFLINE EXPIRY",
                    text: "310910220 EXPIRY on 20-08-1992",
                    imgurl: "src/images/profilepic.png"
                },
                {
                    Table: "OFFLINE EXPIRED CUSTOMERS",
                    headertext: "OFFLINE EXPIRED CUSTOMERS",
                    text: "310910220 EXPIRED on 20-08-1992",
                    imgurl: "src/images/profilepic.png"
                },
                {
                    Table: "UN-PAID CUSTOMERS",
                    headertext: "UN-PAID CUSTOMERS",
                    text: "310910220 Is UnPaid",
                    imgurl: "src/images/profilepic.png"
                },
                {
                    Table: "INACTIVE CUSTOMER",
                    headertext: "INACTIVE CUSTOMER",
                    text: "310910220 inactive",
                    imgurl: "src/images/profilepic.png"
                }, {
                    Table: "TODAY REMAINDERS",
                    headertext: "TODAY REMAINDERS",
                    text: "310910220 Service In 20-08-1992",
                    imgurl: "src/images/profilepic.png"
                },
                {
                    Table: "NOT-VIEWED SERVICES",
                    headertext: "NOT-VIEWED SERVICES",
                    text: "310910220 Service In 20-08-1992",
                    imgurl: "src/images/profilepic.png"
                }, {
                    Table: "NO UPDATE ON MFT",
                    headertext: "NO UPDATE ON MFT",
                    text: "310910220 Service In 20-08-1992",
                    imgurl: "src/images/profilepic.png"
                }, {
                    Table: "YESTERDAY PROCESSING PROFILES",
                    headertext: "PROCESSING PROFILES",
                    text: "310910220 Service In 20-08-1992",
                    imgurl: "src/images/profilepic.png"
                }
            ];
            return model;
        };
        return model.init();

    }
    angular
        .module('Kaakateeya')
        .factory('dashboardModel', factory)

    factory.$inject = ['$http'];

})();