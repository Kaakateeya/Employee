(function() {
    'use strict';

    function factory(http) {
        debugger;

        return {
            getEmployeePayment: function(ProfileID) {
                debugger;
                return http.get('http://183.82.0.58:8010/Api/' + 'Payment/getProfilePaymentDetailsGridview', {
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