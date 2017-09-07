(function(angular) {
    'use strict';

    function factory(http) {
        return {
            submitassignsettings: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/AssignSettings', obj);
            },
            assignsubmit: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/Assignprofiles', obj);
            },
            getDuplicatProfiles: function(profileid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getDuplicateProfiles', {
                    params: { profileID: profileid }
                });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('assignSettingsService', factory);
    factory.$inject = ['$http'];
})(angular);