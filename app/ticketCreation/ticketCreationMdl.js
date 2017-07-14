(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('ticketCreationModel', ['ticketCreationService', function factory(ticketCreationService) {
            var model = {};
            return model;
        }]);
})();