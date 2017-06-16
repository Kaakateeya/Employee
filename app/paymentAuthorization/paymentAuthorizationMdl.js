(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentAuthorizationModel', factory);

    factory.$inject = ['paymentAuthorizationService', 'Commondependency'];

    function factory(paymentAuthorizationService, Commondependency) {
        return function() {
            var model = {};
            model.dateOptions = {
                changeMonth: true,
                changeYear: true,
                yearRange: "-40:+5",
                dateFormat: 'dd-mm-yy'
            };
            model.branchDependency = function(val) {
                model.branchArr = Commondependency.branch(val);
            };


            model.paymentAuthSelect = function() {


            };

            return model;
        };
    }
})();