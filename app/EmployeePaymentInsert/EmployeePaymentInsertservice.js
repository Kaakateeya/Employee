(function() {
    'use strict';

    function factory(http) {
        return {
            getEmployeePaymentdata: function(ProfileID, PaymentHistID) {
                return http.get(app.apiroot + 'Payment/getProfilePaymentDetails_NewDesigns', {
                    params: { intProfileID: ProfileID, intPaymentHistID: PaymentHistID }
                });
            },
            paymentInsert: function(obj) {
                return http.post(app.apiroot + 'Payment/CustomerInsertPaymentDetilsInfo_NewDesign', obj);
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentinsertservice', factory);
    factory.$inject = ['$http'];
})(angular);