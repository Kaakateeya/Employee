(function() {
    'use strict';

    function factory(http) {
        return {
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