(function(angular) {
    'use strict';

    function factory(http) {
        return {
            submitBasicRegistration: function(obj) {
                return http.post(app.apiroot + 'Registration/EmployeeRegisterCustomerHomepages', JSON.stringify(obj));
            },
            emailExists: function(obj) {
                return http.get(app.apiroot + 'StaticPages/getEmailMobilenumberexists', { params: obj });
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('basicRegistrationService', factory);

    factory.$inject = ['$http'];
})(angular);