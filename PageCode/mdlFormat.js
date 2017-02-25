(function() {
    'use strict';

    angular
        .module('module')
        .factory('parametervalueModel', factory)

    factory.$inject = ['$http'];

    function factory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {}
    }
})();