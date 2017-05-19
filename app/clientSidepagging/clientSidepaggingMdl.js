(function() {
    'use strict';



    function factory($http, clientSidepaggingservice) {
        var service = {};
        return service;

    }
    angular
        .module('Kaakateeya')
        .factory('clientSidepaggingModel', factory);

    factory.$inject = ['$http', 'clientSidepaggingservice'];
})();