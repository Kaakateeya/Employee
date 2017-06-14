(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentOffersAssignService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            submitPaymentOffer: function(obj) {
                return http.post(app.apiroot + 'StaticPages/CustomerPaymentOffersAssign', obj);
            }
        };
    }
})();