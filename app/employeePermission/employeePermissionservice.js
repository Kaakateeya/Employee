(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('employeePermissionService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getEmployeePermissions: function(Empuserid, Pageid, flag) {
                return http.get(app.apiroot + 'EmployeeReportPage/getEmployeePermissions', {
                    params: {
                        Empuserid: Empuserid,
                        Pageid: Pageid,
                        flag: flag
                    }
                });
            }
        };
    }
})();