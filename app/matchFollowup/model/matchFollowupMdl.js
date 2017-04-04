(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchFollowupModel', factory)

    factory.$inject = ['$http'];

    function factory($http) {
        var model = {};
        model.test = function() {

            alert(1111);
        };

        return model;
    }
})();