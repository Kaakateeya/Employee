(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('dashboardAdminReportService', ['$http',
            function(http) {
                return {
                    getAdminReportsAllProfiles: function(i_EmpID, i_BranchID, v_MacAddress) {
                        return http.get(app.apiroot + 'EmployeeReportPage/getAdminReportsAllProfiles', { params: { i_EmpID: i_EmpID, i_BranchID: i_BranchID, v_MacAddress: v_MacAddress } });
                    }
                };
            }
        ]);
})();