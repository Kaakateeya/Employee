(function(angular) {
    'use strict';

    function factory($http, service, serviceApp) {
        var model = {};
        var option = [];
        model.init = function() {
            model.casteselectf();
            model.empNamesSelectf();
            return model;
        };

        model.casteselectf = function() {
            service.casteselect().then(function(response) {
                option = [];
                option.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.caste = option;
            });
        };

        model.empNamesSelectf = function() {
            serviceApp.EmpBinding(1, 2, '').then(function(response) {
                option = [];
                option.push({ "label": "--Select--", "title": "--Select--", "value": "" });
                _.each(response.data, function(item) {
                    if (item.CountryCode === 'Profile Owner') {
                        option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    }
                });
                model.empNames = option;
            });
        };

        model.branchf = function() {
            option = [];
            //  option.push({ "label": "--Select--", "title": "--Select--", "value": "" });
            serviceApp.BranchName().then(function(response) {
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.branch = option;
            });
        };

        model.Applicationstatusf = function() {
            option = [];
            serviceApp.Applicationstatus().then(function(response) {
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.Applicationstatus = option;
            });
        };

        model.Smokef = function() {
            option = [];
            serviceApp.Smoke().then(function(response) {
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.Smoke = option;
            });
        };


        model.Dietf = function() {
            option = [];
            serviceApp.Diet().then(function(response) {
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.Diet = option;
            });
        };

        model.EmpNameswithBranchf = function() {
            option = [];
            serviceApp.EmpwithBranch('ProfileBranch', '').then(function(response) {
                _.each(response.data, function(item) {
                    option.push({ "label": item.Name, "title": item.Name, "value": item.ID, ParentName: item.BranchesName });
                });
                model.EmpNameswithBranch = option;
            });
        };






        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('otherArrayModel', factory);

    factory.$inject = ['$http', 'SelectBindService', 'SelectBindServiceApp'];

})(angular);