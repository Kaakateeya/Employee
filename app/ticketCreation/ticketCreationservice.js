(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('ticketCreationService', ['$http', function factory(http) {
            return {
                test: function() {
                    return http.get(app.apiroot + 'test', { params: '' });
                }
            };
        }]);
})();