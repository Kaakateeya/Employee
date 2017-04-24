(function() {
    'use strict';

    function factory(http) {
        return {
            getMyprofilebind: function(flag, ID) {
                return http.get(app.apiroot + 'EmployeeReportPage/getMyProfileBindings', {
                    params: {
                        flag: flag,
                        ID: ID,
                    }
                });
            },
            matchFollowupSelect: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/MatchfollowupSlideShowResult', obj);
            },
            ticketHistry: function(ticketID, TYPE) {
                return http.get(app.apiroot + 'EmployeeReportPage/getMatchFollowupTicketinformation', {
                    params: {
                        Ticketid: ticketID,
                        Type: TYPE
                    }
                });
            },
            sendSms: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/MatchFollowupSendSms', obj);
            },
            sendMail: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/MatchFollowupMailSend', obj);
            },
            bothreplytypeBind: function() {
                return http.get(app.apiroot + 'ExpressInterest/getMatchFollowup_linq', {
                    params: {
                        flag: 'bothside_replytype',
                        ID: '',
                        RelationShipID: ''
                    }
                });
            },
            ResendMail: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/MatchFollowupResendMail', obj);
            },
            ActionSubmit: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/Insertout_incomingcallCommunicationlogData', obj);
            },
            getRaltionName: function(flag, ID, RelationShipID) {
                    return http.get(app.apiroot + 'ExpressInterest/getExpressInterest_linq', {
                        params: {
                            flag: flag,
                            ID: ID,
                            RelationShipID: RelationShipID
                        }
                    });
                }
                // ActionSubmit: function(obj) {
                //     return http.post(app.apiroot + 'EmployeeReportPage/Insertout_incomingcallCommunicationlogData', obj);
                // }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('matchFollowupServices', factory);

    factory.$inject = ['$http'];
})();