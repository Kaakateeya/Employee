(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('norecordsfoundservice', factory);
    factory.$inject = ['$http'];

    function factory(http) {
        return {
            RegistrationValidation: function(obj) {
                return http.post(app.apiroot + 'StaticPages/InsertTicketInfo', obj);
            },

        };
    }
})();