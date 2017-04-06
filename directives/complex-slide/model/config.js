(function() {
    'use strict';

    function factory($http) {
        var model = {};
        model.init = function() {
            model.setSlides = function(data) {
                model.slides = data;
            };
            model.addSlides = function(data) {
                $.merge(model.slides, data);
            };

            return model;
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('complex-slide-config', factory);

    factory.$inject = ['$http'];
})();