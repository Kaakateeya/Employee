/*
 kaakateeyaangularapplication 2017-03-15 
*/
! function() {
    "use strict";

    function controller($location) {}
    angular.module("module").controller("parametervalueCtrl", controller), controller.$inject = ["$location"]
}(),
function() {
    "use strict";

    function factory($http) {
        function getData() {}
        return { getData: getData }
    }
    angular.module("module").factory("parametervalueModel", factory), factory.$inject = ["$http"]
}(),
function() {
    "use strict";

    function factory($http) {
        function getData() {}
        return { getData: getData }
    }
    angular.module("module").factory("parametervalueModel", factory), factory.$inject = ["$http"]
}();