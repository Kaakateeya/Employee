(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('employeePermissionModel', factory);

    factory.$inject = ['employeePermissionService', 'Commondependency', 'SelectBindServiceApp', 'alert',
        'complex-grid-config'
    ];

    function factory(employeePermissionService, Commondependency, SelectBindServiceApp, alerts, configrid) {
        var model = {};
        model.branchArr = [];
        model.ProfileOwnerarray = [];
        model.showsearchrows = true;
        model.showsearch = true;
        model.myprofileexcel = false;
        model.normalexcel = true;
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
        model.Viewpage = function(row) {
            var view = "<md-checkbox ng-model='view" + row.sno + "'></md-checkbox>";
            return view;
        };
        model.Addpage = function(row) {
            var view = "<md-checkbox ng-model='add" + row.sno + "' ></md-checkbox>";
            return view;
        };
        model.Editpage = function(row) {
            var view = "<md-checkbox ng-model='edit" + row.sno + "' ></md-checkbox>";
            return view;
        };
        model.Deletepage = function(row) {
            var view = "<md-checkbox ng-model='delete" + row.sno + "' ></md-checkbox>";
            return view;
        };
        model.submitemployeepermission = function(empid, from, to) {
            if (empid !== "" && empid !== undefined && empid !== null) {
                model.columns = [
                    { text: 'Page Name', key: 'PageDescription', type: 'label' },
                    { text: 'View', key: 'View', type: 'checkbox', templateUrl: model.Viewpage },
                    { text: 'Add', key: 'Add', type: 'checkbox', templateUrl: model.Addpage },
                    { text: 'Edit', key: 'Edit', type: 'checkbox', templateUrl: model.Editpage },
                    { text: 'Delete', key: 'Delete', type: 'checkbox', templateUrl: model.Deletepage }
                ];
                var empuserid = 23;
                var pageid = 3;
                var flag = 1;
                employeePermissionService.getEmployeePermissions(empuserid, pageid, flag).then(function(response) {
                    console.log(response);
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                        var i = 1;
                        model.pageSize = 10;
                        _.map((response.data[0]), function(item) {
                            if (from === 1) {
                                item.sno = i;
                                item.view = i;
                                item.add = i;
                                item.edit = i;
                                item.delete = i;
                                i++;
                            } else {
                                item.sno = (from - 1) + i;
                                item.view = (from - 1) + i;
                                item.add = (from - 1) + i;
                                item.edit = (from - 1) + i;
                                item.delete = (from - 1) + i;
                                i++;
                            }
                        });
                        model.data = (response.data[0]);
                    }
                });
            } else {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please Select Employeename', 3500);

            }
        };
        return model;
    }
})();