(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settleDeleteProfileService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            checkProfileStatus: function(id) {
                return http.get(app.apiroot + 'EmployeeReportPage/getcheckSettlementProfileIDandEmail', { params: { profileID: id } });
            }
        };
    }
})();