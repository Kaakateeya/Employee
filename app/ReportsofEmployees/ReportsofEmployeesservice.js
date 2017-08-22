(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('ReportsofEmployeesService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getAdminReportsAllProfiles: function(i_EmpID, i_BranchID, v_MacAddress) {
                return http.get(app.apiroot + 'EmployeeReportPage/getAdminReportsAllProfiles', { params: { i_EmpID: i_EmpID, i_BranchID: i_BranchID, v_MacAddress: v_MacAddress, flag: 1 } });
            },
            getMyprofilebind: function(flag, ID) {
                return http.get(app.apiroot + 'EmployeeReportPage/getMyProfileBindings', {
                    params: {
                        flag: flag,
                        ID: ID,
                    }
                });
            }
        };
    }
})();