(function(angular) {
    'use strict';

    function factory($http, service) {
        var model = {};

        model.init = function() {
            model.Countryf();
            model.stateSelectf();
            model.countryCodeselectf();
            model.currencyf();
            return model;
        };

        model.Countryf = function() {
            service.countrySelect().then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.Country = option;
            });
        };

        model.stateSelectf = function() {
            service.stateSelect('1').then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.IndiaStates = option;
            });
        };

        model.countryCodeselectf = function() {
            service.countryCodeselect().then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.countryCode = option;
            });
        };

        model.currencyf = function() {
            service.currency().then(function(response) {
                var option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.currency = option;
            });
        };

        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('countryArrayModel', factory);

    factory.$inject = ['$http', 'SelectBindService'];

})(angular);