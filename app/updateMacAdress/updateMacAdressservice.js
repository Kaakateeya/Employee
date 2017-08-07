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
            UpdatemacIps: function(ipAdrr, branchid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getUpadteMacAddess', { params: { strProfileID: ipAdrr, BranchID: branchid } });
            }
        };
    }
})();