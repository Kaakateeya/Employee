(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('customerMessagesverificationService', ['$http', function(http) {
            return {
                test: function() {
                    return http.get(app.apiroot + 'test', { params: '' });
                }
            };
        }]);
})();