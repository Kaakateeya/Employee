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
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentservice', factory)
    factory.$inject = ['$http'];
})(angular);