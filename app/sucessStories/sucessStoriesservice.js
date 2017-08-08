(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('sucessStoriesService', ['$http', function(http) {
            return {
                test: function() {
                    return http.get(app.apiroot + 'test', { params: '' });
                }
            };
        }]);
})();