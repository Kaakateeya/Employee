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
        .factory('bootstrapSlideSVC', factory);
    factory.$inject = ['$http'];

})();