(function(angular) {
    'use strict';

    function factory(assignSettingsService, configgrid) {
        return function() {
            var model = {};


            return model;
        };
    }
    angular
        .module('Kaakateeya')
        .factory('assignSettingsModel', factory);

    factory.$inject = ['assignSettingsService', 'complex-grid-config'];
})(angular);