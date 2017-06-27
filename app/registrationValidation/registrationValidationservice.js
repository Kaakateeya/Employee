(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('registrationValidationservice', factory);
    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getRegSearchProfile: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/RegistrationValidation', obj);
            },
            regValiplayBtn: function(pid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getRegistrationValidation_Playbutton', { params: { Profileid: pid } });
            }
        };
    }
})();