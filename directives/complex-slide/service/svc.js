(function() {
    'use strict';

    function factory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {}
    }
    angular
        .module('Kaakateeya')
        .factory('bootstrapSlideSVC', factory);

    factory.$inject = ['$http'];


})();