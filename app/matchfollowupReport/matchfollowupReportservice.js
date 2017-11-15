(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchfollowupReportService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            EmployeeReportsCounts: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/EmployeeReportsCounts', obj);
            }
        };
    }
})();