(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('NomatchesReasonpageModel', factory);

    factory.$inject = ['NomatchesReasonpageService', 'Commondependency', '$timeout'];

    function factory(NomatchesReasonpageService, Commondependency, timeout) {

        var model = {};
        model.pageloadbindings = function() {
            NomatchesReasonpageService.getMyprofilebind(1, 2, '').then(function(response) {
                model.Brancharray = [];
                _.each(response.data, function(item) {
                    switch (item.CountryCode) {
                        case "Branch":
                            model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            break;
                    }
                });
            });
        };
        model.onchangebranch = function() {
            model.Brancharray = [];
            model.Brancharray = Commondependency.branch((model.rbtnregional !== undefined && model.rbtnregional !== null && model.rbtnregional !== "" && model.rbtnregional !== 0 && model.rbtnregional !== '0') ? (model.rbtnregional) : "");
        };
        model.resetreports = function() {
            model.rbtnregional = "";
            timeout(function() {
                model.tmarketingbranch = "";
            }, 50);
            model.pageloadbindings();
        };
        return model;

    }
})();