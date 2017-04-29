(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('marketHistry', directive);

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
                strnoofdays: '=',
                strmatchmeetingStatus: '=',
                strrelation: '=',

            },
            templateUrl: 'templates/marticketHistry.html'
        };
        return directive;

        function link(scope, element, attrs) {


            var datatt = scope.strtype;

        }
    }

})();