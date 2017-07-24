(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('brokerEntryFormModel', factory)

    factory.$inject = ['brokerEntryFormService'];

    function factory(brokerEntryFormService) {

        var model = {};
        model.emailpattaren = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i;
        model.submitBrokerForm = function() {

            alert(1);
        };



        return model;

    }
})();