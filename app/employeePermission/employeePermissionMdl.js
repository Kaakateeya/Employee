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
        model.myprofileexcel = true;
        model.normalexcel = true;
        model.init = function() {
            model.opendiv = true;
            model.branchArr = Commondependency.branchselect('');
            model.Profileownerbind();
            model.branchid = '';
            model.profileownerid = '';
            model.region = '';
        };
        model.regionChange = function(val) {
            model.branchArr = [];
            model.branchArr = Commondependency.branchselect(val);
            model.branchid = '';
        };
        model.emppermissionreset = function() {
            model.data = [];
            model.branchid = '';
            model.profileownerid = '';
            model.region = '';
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
            model.ngmodel = model.view[row.sno] = row.ViewPages;
            var view = "<md-checkbox ng-model='" + row.ViewPages + "'></md-checkbox>";
            return view;
        };
        model.submitemployeepermission = function(empid, from, to) {
            if (empid !== "" && empid !== undefined && empid !== null) {
                model.columns = [
                    { text: 'Page Name', key: 'PageName', type: 'label' },
                    { text: 'View', key: 'ViewPages', type: 'checkbox' },
                ];
                var empuserid = 23;
                var pageid = '';
                var flag = 0;
                employeePermissionService.getEmployeePermissions(empuserid, pageid, flag).then(function(response) {
                    console.log(response);
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                        var i = 1;
                        model.pageSize = 10;
                        _.map((response.data[0]), function(item) {
                            item.ViewPages = item.ViewPages === 1 ? true : false;
                            if (from === 1) {
                                item.sno = i;
                                // [item.value]+""+i = item.ViewPages === 1 ? true : false;
                                i++;
                            } else {
                                item.sno = (from - 1) + i;
                                // item.ViewPages[(from - 1) + i] = item.ViewPages === 1 ? true : false;
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