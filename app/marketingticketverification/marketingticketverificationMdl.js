(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('marketingticketverificationModel', ['marketingticketverificationService', 'complex-grid-config', function(marketingticketverificationService, configgrid) {

            var model = {};
            model.showsearchrows = true;
            model.showsearch = true;
            model.showpaging = true;
            model.showClientpaging = false;
            model.myprofileexcel = true;
            model.normalexcel = true;
            model.gridTableshow = false;
            model.showplus = false;
            model.submitmarktingreports = function() {

            };
            return model;

        }]);


})();