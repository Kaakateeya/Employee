(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('employeePermissionModel', factory);

    factory.$inject = ['employeePermissionService', 'Commondependency', 'SelectBindServiceApp', 'alert'];

    function factory(employeePermissionService, Commondependency, SelectBindServiceApp, alerts) {

        var model = {};
        model.branchArr = [];
        model.ProfileOwnerarray = [];
        model.init = function() {
            model.opendiv = true;
            model.branchArr = Commondependency.branchselect('');
            model.Profileownerbind();
            model.branchid = '';
            model.profileownerid = '';
        };
        model.regionChange = function(val) {
            model.branchArr = [];
            model.branchArr = Commondependency.branchselect(val);
            model.branchid = '';
        };
        model.onchangeemployee = function(val) {
            model.ProfileOwnerarray = [];
            SelectBindServiceApp.dependencyempnames((val !== undefined && val !== null && val !== "" && val !== 0 && val !== '0') ? (val) : "").then(function(response) {
                model.ProfileOwnerarray.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                });
                model.profileownerid = '';
            });
        };
        model.Profileownerbind = function() {
            SelectBindServiceApp.EmpBinding(1, 2, '').then(function(response) {
                model.ProfileOwnerarray = [];
                model.ProfileOwnerarray.push({ "label": "--select--", "title": "--select--", "value": "" });
                _.each(response.data, function(item) {
                    if (item.CountryCode === 'Profile Owner') {
                        model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    }
                });
                model.profileownerid = '';
            });
        };
        model.submitemployeepermission = function(empid) {
            if (empid !== "" && empid !== undefined && empid !== null) {
                model.columns = [
                    { text: 'Page Name', key: 'PageDescription', type: 'label' },
                    { text: 'View', key: 'View', type: 'label' },
                    { text: 'Add', key: 'Add', type: 'label' },
                    { text: 'Edit', key: 'Edit', type: 'label' },
                    { text: 'Delete', key: 'Delete', type: 'label' }
                ];
                var empuserid = 23;
                var pageid = 3;
                var flag = 1;
                employeePermissionService.getEmployeePermissions(empuserid, pageid, flag).then(function(response) {
                    console.log(response);
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                        model.data = response.data[0];
                    }
                });
            } else {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please Select Employeename', 3500);

            }
        };
        return model;

    }
})();