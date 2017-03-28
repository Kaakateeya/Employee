(function() {
    'use strict';

    function factory(http) {
        debugger;

        return {
            getEmployeePaymentdata: function(ProfileID) {
                debugger;
                return http.get(app.apirootpay + 'Payment/getProfilePaymentDetails_NewDesigns', {
                    params: { intProfileID: ProfileID }
                });
            },
            paymentInsert: function(obj) {
                return http.post(app.apirootpay + 'Payment/CustomerInsertPaymentDetilsInfo_NewDesign', obj);
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentinsertservice', factory)
    factory.$inject = ['$http'];
})(angular);