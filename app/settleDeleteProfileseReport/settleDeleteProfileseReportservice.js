(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settleDeleteProfileseReportService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            ProfileDeleteProfilesReport: function(obj) {
                return http.post(app.apiroot + 'smallPages/ProfileDeleteProfilesReport', obj);
            }
        };
    }
})();