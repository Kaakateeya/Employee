(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentdetailsReportService', ['$http', function(http) {
            return {
                EmplyeepaymentReportspayment: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/EmplyeepaymentReportspayment', obj);
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
        }]);
})();