(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('marketingticketverificationService', ['$http', function(http) {
            return {
                marketingverificationticketsubmit: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/authorizationpaymentamoutReport', obj);
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