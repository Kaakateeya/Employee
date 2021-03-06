(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .directive('marketTickethistory', directive);

    directive.$inject = ['marketticketHistrymdl', 'modelpopupopenmethod', '$timeout'];

    function directive(marketticketHistrymdl, modelpopupopenmethod, timeout) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                ticketid: '=',
                showreminder: '='
            },
            templateUrl: 'directives/marketing-slide/index.html'
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
                scope.model.MAobj.ddlmrktReplyTypeIn =
                scope.model.MAobj.txtmrktCalldiscussionin =
                scope.model.MAobj.txtmrktCalldiscussionout =
                scope.model.MAobj.txtmrktcalldiscussionMemo = "";
            scope.model.MAobj.ddlmrktAssignmemo = "";
            scope.model.selectedIndex = 0;
            scope.model.empnamecalled = false;
        }
    }
})();