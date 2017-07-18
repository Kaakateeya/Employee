(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentAuthorizationService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            CustomerUnauthorizedPayments: function(obj) {
                return http.get(app.apiroot + 'StaticPages/getCustomerUnauthorizedPayments', {
                    params: { BranchID: obj.BranchID, StartDate: obj.StartDate, EndDate: obj.EndDate, Region: obj.Region }
                });
            },
            submitAuthorization: function(obj) {
                return http.post(app.apiroot + 'Payment/setPaymentAuthorization', obj);
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