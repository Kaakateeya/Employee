(function() {
    'use strict';

    function directive(paymenteditpointsmdl, modelpopupopenmethod, timeout) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                models: '='

            },
            templateUrl: 'directives/payment-editpointsdate/index.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.model = paymenteditpointsmdl;
            scope.model.Allvalues = {};
            scope.model.Allvalues = scope.models;
            scope.model.scope = scope;
        }
    }
    angular
        .module('Kaakateeya')
        .directive('paymentEditpoints', directive);
    directive.$inject = ['paymenteditpointsmdl', 'modelpopupopenmethod', '$timeout'];
})();