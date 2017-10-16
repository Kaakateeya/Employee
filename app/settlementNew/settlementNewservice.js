(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settlementNewService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            test: function() {
                return http.get(app.apiroot + 'test', { params: '' });
            }
        };
    }
})();