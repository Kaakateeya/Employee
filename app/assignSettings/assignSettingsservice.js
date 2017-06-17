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
            submitassignsettings: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/AssignSettings', obj);
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('assignSettingsService', factory);

    factory.$inject = ['$http'];

})();