(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('SettledDeleteFromModel', factory)

    factory.$inject = ['$http'];

    function factory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {}
    }
})();