(function() {
    'use strict';

    function factory($http) {
        var model = {};
        model.init = function() {

            model.setData = function(data) {
                model.data = data;
            };
            model.appendData = function(data) {
                $.merge(model.data, data);
            };
            return model;
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('complex-grid-config', factory)

    factory.$inject = ['$http'];
})();