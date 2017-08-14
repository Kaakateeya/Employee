(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentAuthorizationService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            CustomerUnauthorizedPayments: function(obj) {
                return http.get(app.apiroot + 'StaticPages/getCustomerUnauthorizedPayments', {
                    params: { BranchID: obj.BranchID, StartDate: obj.StartDate, EndDate: obj.EndDate, Region: obj.Region }
                });
            },
            submitAuthorization: function(obj) {
                return http.post(app.apiroot + 'Payment/setPaymentAuthorization', obj);
            },
            checkmarketingTicket: function(ticetID) {
                return http.get(app.apiroot + 'smallPages/GetcheckMarketingTicket', {
                    params: { ticketID: ticetID }
                });
            },
            memoSubmit: function(msg, tktID, empid, assignEmpid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getInsertInternalMemo', {
                    params: { Message: msg, TicketID: tktID, EmpID: empid, AssignedEmpID: assignEmpid }
                });
            }
        };
    }
})();