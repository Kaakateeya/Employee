(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('emailbounceEntryformService', ['$http', function(http) {
            return {
                InsertEmailBouceEntry: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/InsertEmailBouceEntry', obj);
                },
                getexistanceprofileornot: function(profileid) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getexistanceprofileornot', { params: { profileid: profileid } });
                }
            };
        }]);
})();