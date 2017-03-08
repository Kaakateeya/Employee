(function() {
    'use strict';

    function factory($http) {
        var model = {};
        model.init = function() {
            return model;
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('searchpageModel', factory);
    factory.$inject = ['$http'];
})();