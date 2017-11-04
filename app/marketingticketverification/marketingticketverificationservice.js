(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('marketingticketverificationService', ['$http', function(http) {
            return {
                marketingverificationticketsubmit: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/authorizationpaymentamoutReport', obj);
                },

                marketinggetprofiledetails: function(custids) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getCustomerinfobasedoncustid', {
                        params: { custids: custids }
                    });
                },
                updatemarketingvrfycation: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/updatemarketingvrfycation', obj);
                }


            };
        }]);
})();