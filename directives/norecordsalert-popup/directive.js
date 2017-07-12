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


        }
    }
    angular
        .module('Kaakateeya')
        .directive('noRecordfound', directive);
    directive.$inject = ['norecoredsfoundmdl', 'modelpopupopenmethod', '$timeout'];
})();