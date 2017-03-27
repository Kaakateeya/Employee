(function() {
    'use strict';

    function factory(http) {
        debugger;

        return {
            getEmployeePaymentdata: function(ProfileID) {
                debugger;
                return http.get(app.apiroot + 'Payment/getProfilePaymentDetails_NewDesigns', {
                    params: { intProfileID: ProfileID }
                });
            },
            paymentInsert: function(obj) {
                return http.post(app.apiroot + 'Payment/CustomerInsertPaymentDetilsInfo_NewDesign', obj);
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentinsertservice', factory)
    factory.$inject = ['$http'];
})(angular);