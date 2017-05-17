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
        };

    }
    angular
        .module('Kaakateeya')
        .factory('communicationLogService', factory);
    factory.$inject = ['$http'];
})(angular);