(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('registrationValidationservice', factory);
    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getRegSearchProfile: function(obj) {
                if (parseInt(obj.intflag) === 1) {
                    return http.post(app.apiroot + 'EmployeeReportPage/RegistrationValidation', obj);
                } else {
                    return http.post(app.apiroot + 'EmployeeReportPage/RegistrationValidationtable', obj);
                }
            },
            regValiplayBtn: function(pid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getRegistrationValidation_Playbutton', { params: { Profileid: pid } });
            }
        };
    }
})();