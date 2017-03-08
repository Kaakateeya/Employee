(function(angular) {
    'use strict';

    function factory(http) {
        return {

        };
    }
    angular
        .module('Kaakateeya')
        .factory('searchpageServices', factory);
    factory.$inject = ['$http'];
})(angular);