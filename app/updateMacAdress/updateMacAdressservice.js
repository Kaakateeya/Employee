(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('updateMacAdressService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getmacIps: function(obj) {
                return http.post(app.apiroot + 'smallPages/MacIpValues', obj);
            },
            UpdatemacIps: function(ipAdrr, ipAdrr1, branchid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getUpadteMacAddess', { params: { strProfileID: ipAdrr, ipaddresss2: ipAdrr1, BranchID: branchid } });
            }
        };
    }
})();