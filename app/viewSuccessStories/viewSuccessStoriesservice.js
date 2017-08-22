(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('viewSuccessStoriesService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            viewSuccessStories: function(obj) {
                return http.post(app.apiroot + 'smallPages/ViewSuccessStories', obj);
            }
        };
    }
})();