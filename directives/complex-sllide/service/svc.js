(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('bootstrapSlideSVC', factory)

    factory.$inject = ['$http'];

    function factory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {}
    }
})();