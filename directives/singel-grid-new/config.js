(function() {
    'use strict';

    function factory($http) {
        var model = {};
        model.init = function() {
            model.showplus = false;
            model.showsearch = true;
            model.showpaging = true;
            model.setDatagrid = function(data) {
                model.sdata = data;
            };
            return model;
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('single-grid-config', factory);

    factory.$inject = ['$http'];
})();