(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('showHoroService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            test: function() {
                return http.get(app.apiroot + 'test', { params: '' });
            }
        };
    }
})();