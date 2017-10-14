(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settlementNewModel', factory);

    factory.$inject = ['settlementNewService'];

    function factory(settlementNewService) {

        var model = {};
        model.data = ['aaaa', 'bbbbb', 'ccc'];
        return model;

    }
})();