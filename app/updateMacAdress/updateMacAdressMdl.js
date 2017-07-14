(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('updateMacAdressModel', factory)

    factory.$inject = ['updateMacAdressService'];

    function factory(updateMacAdressService) {
        return function() {
            var model = {};

            return model;
        };
    }
})();