(function(angular) {
    'use strict';

    function factory(http) {
        return {
            Submitcommunicationlog: function(profileid, empid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getEmployeeCommunicationLog', {
                    params: {
                        ProfileID: profileid,
                        intEmpId: empid
                    }
                });
            },
            EmployeeCommunicationLogRvrAndResend: function(Mobj) {
                return http.post(app.apiroot + 'EmployeeReportPage/EmployeeCommunicationLogRvrAndResend', Mobj);
            },
            Sentphotosemail: function(Email, custid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getEmployeeCommunicationLogSentphotosemail', {
                    params: {
                        Email: Email,
                        CustID: custid
                    }
                });
            },
            EmployeeCommunicationLogSendMarketingMail: function(mobj) {
                return http.post(app.apiroot + 'EmployeeReportPage/EmployeeCommunicationLogSendMarketingMail', mobj);
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('communicationLogService', factory);
    factory.$inject = ['$http'];
})(angular);