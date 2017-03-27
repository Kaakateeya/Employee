(function() {
    'use strict';

    function factory(http) {
        debugger;

        return {
            getEmployeePayment: function(ProfileID) {
                debugger;
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