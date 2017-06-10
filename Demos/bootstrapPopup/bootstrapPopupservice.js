(function() {
    'use strict';

    function factory($http) {
        var model = {};
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('bootstrapPopupService', factory);
    factory.$inject = ['$http'];
})();