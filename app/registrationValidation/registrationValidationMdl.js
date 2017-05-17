(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('registrationValidationModel', factory)

    factory.$inject = ['registrationValidationservice'];

    function factory($http) {
        var model = {};

        model.applicationstatusArr = [
            { "label": "--Select--", "title": "--Select--", "value": '' },
            { "label": "Active", "title": "Active", "value": 54 },
            { "label": "InActive", "title": "InActive", "value": 55 },
            { "label": "Deleted/WaitingforDeltdAuth", "title": "Deleted/WaitingforDeltdAuth", "value": 56 },
            { "label": "Settled/WaitingforSetldAuth", "title": "Settled/WaitingforSetldAuth", "value": 57 },
            { "label": "MMSerious", "title": "MMSerious", "value": 395 }
        ];
        return model;
    }
})();