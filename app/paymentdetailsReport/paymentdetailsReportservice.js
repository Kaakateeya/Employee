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