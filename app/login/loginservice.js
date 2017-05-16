(function(angular) {
    'use strict';

    function factory(http, authSvc) {
        return {
            getloginpage: function(form) {
                return http.get(app.apiroot + 'DB/getValidateLoginNew', {
                    params: {
                        LoginName: form.usernameemployee,
                        Password: form.passwordemployee,
                        sMAC: authSvc.clientIp()
                    }
                });
            },
            getEmployeeLoginCoutDetails: function() {
                return http.get(app.apiroot + 'StaticPages/getEmployeeLoginCoutDetails', {
                    params: {}
                });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('loginservice', factory);
    factory.$inject = ['$http', 'authSvc'];
})(angular);