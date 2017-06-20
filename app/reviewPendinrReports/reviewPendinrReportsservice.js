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
            submitreviewpending: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/ReviewpendingReports', obj);
            },
            ReviewpendingReassign: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/ReviewpendingReassign', obj);
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('reviewPendinrReportsService', factory);

    factory.$inject = ['$http'];
})();