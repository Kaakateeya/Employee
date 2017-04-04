(function() {
    'use strict';

    function factory($http) {
        var service = {
            getData: getData
        };
        return service;
    }
    angular
        .module('Kaakateeya')
        .factory('bootstrapSlideModel', factory);
    factory.$inject = ['$http'];

})();