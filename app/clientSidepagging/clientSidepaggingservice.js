(function() {
    'use strict';


    function factory($http) {
        var service = {

        };

        return service;


    }
    angular
        .module('Kaakateeya')
        .factory('clientSidepaggingservice', factory);

    factory.$inject = ['$http'];

})();