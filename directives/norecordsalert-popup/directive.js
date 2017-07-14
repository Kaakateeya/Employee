(function() {
    'use strict';

    function directive(norecoredsfoundmdl, modelpopupopenmethod, timeout) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                models: '='

            },
            templateUrl: 'directives/norecordsalert-popup/index.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.model = norecoredsfoundmdl;
            scope.model.Allvalues = {};
            scope.model.Allvalues = scope.models;
            scope.model.scope = scope;
            scope.model.Customername = '';
            scope.model.customernarration = '';



        }
    }
    angular
        .module('Kaakateeya')
        .directive('noRecordfound', directive);
    directive.$inject = ['norecoredsfoundmdl', 'modelpopupopenmethod', '$timeout'];
})();