(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('marketingTicketHistryservice', factory)
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
            }
        };
    }
})();