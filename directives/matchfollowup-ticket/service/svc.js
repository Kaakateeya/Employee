(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchfollowupTicketHistryservice', factory);
    factory.$inject = ['$http'];

    function factory(http) {
        return {
            InOutSubmit: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/Insertout_incomingcallData', obj);
            },
            memoSubmit: function(msg, tktID, empid, assignEmpid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getInsertInternalMemo', {
                    params: { Message: msg, TicketID: tktID, EmpID: empid, AssignedEmpID: assignEmpid }
                });
            },
            closeSubmit: function(reasn, tktID, empid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getClosedTickets', {
                    params: { ReasonforClose: reasn, TicketID: tktID, EmpID: empid }
                });
            },
            assignEmpSubmit: function(tktID, empid, assignEmpid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getReaasignEmployee', {
                    params: { TicketID: tktID, AssignedEmpID: assignEmpid, EmpID: empid, StatusID: 2 }
                });
            },
            getmarSlide: function(tktID, type) {
                return http.get(app.apiroot + 'EmployeeReportPage/getMatchFollowupTicketinformation', {
                    params: { Ticketid: tktID, Type: type }
                });
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
        };
    }
})();