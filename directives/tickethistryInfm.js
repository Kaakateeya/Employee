(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('tickethistryInfm', directive);

    directive.$inject = ['$window'];

    function directive($window) {
        debugger;
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                strtype: '=',
                strdate: '=',
                strempname: '=',
                strstatus: '=',
                strcustName: '=',
                strcomments: '=',
                strrelationship: '='
            },
            templateUrl: 'templates/tickethistryInfm.html'
        };
        return directive;

        function link(scope, element, attrs) {
            debugger;
            scope.relationname = '';
            scope.relationname = scope.strcustName !== undefined && scope.strcustName !== "" ? (scope.strcustName + '(' + scope.strrelationship + ')') : '';
        }
    }

})();