(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('marketingticketverificationService', ['$http', function(http) {
            return {
                test: function() {
                    return http.get(app.apiroot + 'test', { params: '' });
                }
            };
        }]);
})();