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
                },

                custmorfactsheetsendMail: function(profileid) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getcustmorfactsheetsendMail', { params: { profileid: profileid } });
                },
                sendEmail_factResetPassword: function(profileid) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getsendEmail_factResetPassword', { params: { profileid: profileid } });
                },
                getsendEmail_ResetPassword: function(profileid) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getsendEmail_ResetPassword', { params: { profileid: profileid } });
                },
                // sendexpressinterest: function(obj) {
                //     return http.post(app.apiroot + 'CustomerService/CustomerServiceBal', obj);
                // },
                getEmployeePayment: function(ProfileID) {
                    return http.get(app.apiroot + 'Payment/getProfilePaymentDetailsGridview', {
                        params: {
                            intProfileID: ProfileID
                        }
                    });
                },
                submitExpressintrst: function(ExpArrInput) {
                    return http.post(app.apiroot + 'ExpressInterest/ExpressInterest', ExpArrInput);
                },
            };
        }]);

})();