(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('marketingticketverificationService', ['$http', function(http) {
            return {
                marketingverificationticketsubmit: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/marktingverificationticketsreport', obj);
                }
            };
        }]);
})();