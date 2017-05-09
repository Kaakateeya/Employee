(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .directive('matchfollowupTickethistory', directive);

    directive.$inject = ['matchfollowupticketHistrymdl', 'modelpopupopenmethod', '$timeout'];

    function directive(marketticketHistrymdl, modelpopupopenmethod, timeout) {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                ticketid: '='
            },
            templateUrl: 'directives/matchfollowup-ticket/index.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.model = marketticketHistrymdl;
            scope.model.ticketid = scope.ticketid;
            scope.model.scope = scope;
            scope.model.getMrktSlideInfo(scope.ticketid);
            scope.model.MAobj.ddlmrktCallresultIn = scope.model.MAobj.ddlmrktcallresultout = "417";
            scope.model.MAobj.ddlmrktreceivedIn = scope.model.MAobj.ddlmrktreceivedout = "39";
            scope.model.MAobj.rbtnmarketDisplayIn = scope.model.MAobj.rbtndisplayOut = "2";
            scope.model.MAobj.ddlmrktreplytypeout =
                scope.model.MAobj.ddlmrktReplyMemo =
                scope.model.MAobj.ddlmrktreplyClose =
                scope.model.MAobj.ddlmrktReplyTypeIn = "";
            // timeout(function() { console.log(scope.model.marInfo); }, 25000);

        }
    }

})();