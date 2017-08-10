(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentInsertnewService', factory);

    factory.$inject = ['$http'];

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
})();