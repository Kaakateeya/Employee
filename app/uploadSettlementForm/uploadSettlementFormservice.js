(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('uploadSettlementFormService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            submitUpload: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/uploadSettlementForm', obj);
            },
            checkProfileID: function(profileid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getcheckSettlementProfileID', { params: { profileID: profileid } });
            }
        };
    }
})();