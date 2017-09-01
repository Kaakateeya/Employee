(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('ReportsofEmployeesService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getAdminReportsAllProfiles: function(i_EmpID, i_BranchID, i_Region, v_MacAddress, flag, v_ProfileOwnerEmpID) {
                return http.get(app.apiroot + 'EmployeeReportPage/getAdminReportsAllProfiles', { params: { i_EmpID: i_EmpID, i_BranchID: i_BranchID, i_Region: i_Region, v_MacAddress: v_MacAddress, flag: flag, v_ProfileOwnerEmpID: v_ProfileOwnerEmpID } });
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