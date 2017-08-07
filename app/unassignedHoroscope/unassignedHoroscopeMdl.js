(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('unassignedHoroscopeModel', factory)

    factory.$inject = ['unassignedHoroscopeService'];

    function factory(unassignedHoroscopeService) {

        var model = {};

        return model;

    }
})();