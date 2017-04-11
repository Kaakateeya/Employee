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
            getMyprofileSlide: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/MyprofileAllslides', obj);
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('myProfileservice', factory)
    factory.$inject = ['$http'];
})(angular);