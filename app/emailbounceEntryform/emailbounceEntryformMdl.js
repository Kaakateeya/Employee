(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('emailbounceEntryformModel', ['emailbounceEntryformService', function(emailbounceEntryformService) {
            var model = {};

            model.submitemailbouncesubmitform = function() {

            };
            return model;
        }]);
})();