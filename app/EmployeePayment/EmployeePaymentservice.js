(function() {
    'use strict';

    function factory(http) {
        return {
            getEmployeePayment: function(ProfileID) {
                return http.get(app.apiroot + 'Payment/getProfilePaymentDetailsGridview', {
                    params: {
                        intProfileID: ProfileID
                    }
                });
            },
            getoldpaymentstatus: function(ProfileID) {
                return http.get(app.apiroot + 'StaticPages/getCustomerProfileIDstatus', { params: { ProfileID: ProfileID } });

            },
            getoldpaymentdata: function(ProfileID, BranchID) {
                return http.get(app.apiroot + 'StaticPages/getCustomerParofileIDbasePayment', { params: { ProfileID: ProfileID, BranchID: BranchID } });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentservice', factory);
    factory.$inject = ['$http'];
})(angular);