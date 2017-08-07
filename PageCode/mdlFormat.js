(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('parametervalueModel', factory)

    factory.$inject = ['parametervalueService'];

    function factory(parametervalueService) {

        var model = {};

        return model;

    }
})();