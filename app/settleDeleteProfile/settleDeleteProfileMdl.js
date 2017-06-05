(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settleDeleteProfileModel', factory)

    factory.$inject = ['settleDeleteProfileService'];

    function factory(settleDeleteProfileService) {
        return function() {
            var model = {};

            return model;
        };
    }
})();