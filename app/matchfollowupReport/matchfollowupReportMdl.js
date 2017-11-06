(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchfollowupReportModel', factory);
    factory.$inject = ['matchfollowupReportService', 'SelectBindServiceApp', 'complex-grid-config',
        'complex-slide-config', 'arrayConstants', 'getArraysearch'
    ];

    function factory(matchfollowupReportService, SelectBindServiceApp, complexgrig, slideConfig, arraycons, getArraysearch) {
        var model = {};
        ///
        model.slide = {};
        model.slide.config = slideConfig;
        model.scope = {};
        model.grid = {};
        //grid
        model.opendiv = true;
        model.grid.gridTableshow = true;
        model.grid.showsearchrows = true;
        model.grid.showsearch = true;
        model.grid.showpaging = true;
        model.grid.myprofileexcel = true;
        model.grid.normalexcel = true;
        model.grid.showplus = true;
        ///
        model.empNamesInOutArr = [];
        model.Brancharray = [];
        model.regionarray = [];
        model.regionchange = function(val) {
            model.Brancharray = [];
            SelectBindServiceApp.branch(val).then(function(response) {
                _.each(response.data, function(item) {
                    model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
            });
        };
        model.init = function() {
            // model.resetreport();
            model.getEmpnamesinout();
            model.empregion = '';
            return model;
        };
        model.resetreport = function() {
            model.empNamesInOutArr = [];
            model.Brancharray = [];
            model.regionarray = [];
            model.empregion = '';
        };
        model.getEmpnamesinout = function() {
            // model.regionarray = arraycons.region;
            model.regionarray = [
                { "label": "--Select--", "title": "--Select--", "value": '' },
                { "label": "AP", "title": "AP", "value": 408 },
                { "label": "TN", "title": "TN", "value": 409 },
                { "label": "KT", "title": "KT", "value": 410 }
            ];
            model.chkarraylistservice = [
                { value: 1, name: 'No-Service List Since a Month' },
                { value: 2, name: 'Payment Expired Customers' },
                { value: 3, name: 'No Photos Customers' },
                { value: 4, name: 'Not Yet Verified Contact Details' },
                { value: 5, name: 'Un-Paid Customers' },
                { value: 6, name: 'Inactive Customers' },
                { value: 7, name: 'Email Bounce Info' },
                { value: 8, name: 'Presently In India' },
                { value: 9, name: 'No Sa Form For Paid Profiles' }
            ];
            model.empNamesInOutArr = [];
            model.Brancharray = [];
            SelectBindServiceApp.EmpBinding(1, 2, '').then(function(response) {
                _.each(response.data, function(item) {
                    switch (item.CountryCode) {
                        case "Profile Owner":
                            model.empNamesInOutArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            break;
                        case "Branch":
                            model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            break;
                    }

                });
            });

        };
        model.empworkpendingreport = function() {
            var obj = {

            };
        };
        model.empreset = function() {
            model.empregion = '';
            model.empbranch = '';
            model.employeename = '';
            model.chkservice = '';
        };
        return model;

    }
})();