(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentdetailsReportService', ['$http', function(http) {
            return {
                EmplyeepaymentReportspayment: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/EmplyeepaymentReportspayment', obj);
                },
                sendmail: function(custid) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getSendMailRegidtrationFeeDetails', {
                        params: {
                            CustID: custid
                        }
                    });
                },
                sendsms: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/EmployeepaymentreportsSendsms', obj);
                }
            };
        }]);
})();