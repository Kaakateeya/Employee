(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('emailbounceEntryformService', ['$http', function(http) {
            return {
                test: function() {
                    return http.get(app.apiroot + 'test', { params: '' });
                }
            };
        }]);
})();