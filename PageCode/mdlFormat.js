(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('parametervalueModel', factory)

    factory.$inject = ['parametervalueService'];

    function factory(parametervalueService) {
        return function() {
            var model = {};

            return model;
        };
    }
})();