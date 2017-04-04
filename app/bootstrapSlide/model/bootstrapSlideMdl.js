(function() {
    'use strict';

    function factory($http) {
        var service = {
            getData: getData
        };
    }
    angular
        .module('Kaakateeya')
        .factory('bootstrapSlideModel', factory);
    factory.$inject = ['$http'];
})();