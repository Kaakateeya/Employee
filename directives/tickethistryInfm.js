(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('tickethistryInfm', directive);

    directive.$inject = ['$window'];

    function directive($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
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

            scope.strcustName = scope.strcustName + '(' + scope.strrelationship + ')';



        }
    }

})();