(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('unassignedHoroscopeService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            test: function() {
                return http.get(app.apiroot + 'test', { params: '' });
            }
        };
    }
})();