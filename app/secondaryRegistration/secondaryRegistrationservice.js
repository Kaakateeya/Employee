(function(angular) {
    'use strict';

    function factory(http) {
        return {
            submitSecodaryRegistration: function(obj) {
                return http.post(app.apiroot + 'Registration/CustomerRegProfileDetails', JSON.stringify(obj));
            },
            emailExists: function(obj) {
                return http.get(app.apiroot + 'StaticPages/getEmailMobilenumberexists', { params: obj });
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('secondaryRegistrationService', factory);

    factory.$inject = ['$http'];
})(angular);