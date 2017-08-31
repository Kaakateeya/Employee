(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settleDeleteProfileseReportService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            ProfileDeleteProfilesReport: function(obj) {
                return http.post(app.apiroot + 'smallPages/settleDeleteProfilesReport', obj);
            },
            restoreProfile: function(obj) {
                return http.post(app.apiroot + 'smallPages/restoreProfile', obj);
            },
        };
    }
})();