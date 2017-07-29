(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('brokerProfileRegistrationService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            submitBasicRegistrationBroker: function(obj) {
                return http.post(app.apiroot + 'Registration/EmployeeRegisterCustomerHomepagesBrokerProfiles', JSON.stringify(obj));
            },
            emailExists: function(obj) {
                return http.get(app.apiroot + 'StaticPages/getbrokerEmailMobilenumberexists', { params: obj });
            }
        };
    }
})();