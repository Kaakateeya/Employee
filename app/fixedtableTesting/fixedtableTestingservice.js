(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('fixedtableTestingService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            Submitcommunicationlog: function(profileid, empid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getEmployeeCommunicationLog', {
                    params: {
                        ProfileID: '310910220',
                        intEmpId: 2
                    }
                });
            },
        };
    }
})();