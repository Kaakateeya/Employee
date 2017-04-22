(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .directive('marketTickethistory', directive);

    directive.$inject = ['marketticketHistrymdl', 'modelpopupopenmethod'];

    function directive(marketticketHistrymdl, modelpopupopenmethod) {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                ticketID: '='
            },
            templateUrl: 'directives/marketing-slide/index.html'
        };
        return directive;

        function link(scope, element, attrs) {

            scope.model = marketticketHistrymdl;
            scope.model.ticketID = scope.ticketID;


        }
    }

})();