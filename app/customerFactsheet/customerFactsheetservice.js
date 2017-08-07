(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('customerFactsheetService', ['$http', function(http) {
            return {
                getVerifyProfileid: function(profileid) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getVerifyProfileid', { params: { profileid: profileid } });
                },
                CustomerFactsheetDetails: function(profileid) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getCustomerFactsheetDetails', { params: { Profileid: profileid } });
                }
            };
        }]);

})();