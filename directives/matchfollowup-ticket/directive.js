(function() {
    'use strict';

    function directive(marketticketHistrymdl, modelpopupopenmethod, timeout) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                ticketid: '=',
                showsendemail: "=",
                ticketstatus: "="
            },
            templateUrl: 'directives/matchfollowup-ticket/index.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.model = marketticketHistrymdl;
            scope.model.ticketid = scope.ticketid;
            scope.model.showsendemail = scope.showsendemail === '1' ? true : false;
            scope.model.ticketstatus = scope.ticketstatus;
            scope.model.scope = scope;
            scope.model.getMrktSlideInfo(scope.ticketid);
            scope.model.MAobj.ddlmrktCallresultIn = scope.model.MAobj.ddlmrktcallresultout = "417";
            scope.model.MAobj.ddlmrktreceivedIn = scope.model.MAobj.ddlmrktreceivedout = "39";
            scope.model.MAobj.rbtnmarketDisplayIn = scope.model.MAobj.rbtndisplayOut = scope.model.MAobj.rbtnshowOutmatchfollowup = scope.model.MAobj.rbtnmarketDisplayIn = "0";
            scope.model.MAobj.ddlmrktreplytypeout =
                scope.model.MAobj.ddlmrktReplyMemo =
                scope.model.MAobj.ddlmrktreplyClose =
                scope.model.MAobj.ddlmrktReplyTypeIn = "";
            scope.model.MAobj.ddlresendemailmatchfollowup = 5;
            scope.model.incommingbtntext = "Incoming Call";
            scope.model.outgoingcallbtntext = "Outgoing Call";
            scope.model.selectedIndex = 0;
            scope.model.MAobj.txtmatchfollowupCalldiscussionOut = scope.model.MAobj.txtmatchfollowupCalldiscussion = "";
            scope.model.replytypetxtdiabled = false;
            timeout(function() {
                scope.model.MAobj.txtresendemail = scope.model.mailchange(scope.model.MAobj.ddlresendemailmatchfollowup);
            }, 2000);
        }
    }
    angular
        .module('Kaakateeya')
        .directive('matchfollowupTickethistory', directive);
    directive.$inject = ['matchfollowupticketHistrymdl', 'modelpopupopenmethod', '$timeout'];
})();