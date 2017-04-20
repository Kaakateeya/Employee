(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('tickethistryInfm', directive);

    directive.$inject = ['$window'];

    function directive($window) {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                strtype: '=',
                strdate: '=',
                strempname: '=',
                strstatus: '=',
                strcustname: '=',
                strcomments: '=',
                strrelationship: '='
            },
            templateUrl: 'templates/tickethistryInfm.html'
        };
        return directive;

        function link(scope, element, attrs) {
            // scope.relationname = '';
            // scope.relationname = scope.strcustname !== undefined && scope.strcustname !== "" ? (scope.strcustname + '(' + scope.strrelationship + ')') : '';
        }
    }

})();