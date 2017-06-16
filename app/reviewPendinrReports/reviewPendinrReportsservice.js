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
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('reviewPendinrReportsService', factory);

    factory.$inject = ['$http'];
})();