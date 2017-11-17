(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('employeePermissionModel', factory);

    factory.$inject = ['employeePermissionService', 'Commondependency', 'SelectBindServiceApp', 'alert',
        'complex-grid-config', '$filter'
    ];

    function factory(employeePermissionService, Commondependency, SelectBindServiceApp, alerts, configrid, $filter) {
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
        model.submitemployeepermission = function(empid, type) {
            if (empid !== "" && empid !== undefined && empid !== null) {
                model.columns = [
                    { text: 'Page Name', key: 'PageName', type: 'label' },
                    { text: 'View', key: 'ViewPages', type: 'checkbox' },
                ];
                model.arrayheader = ["Page Name", "View"];
                var pageid = '';
                var flag = 0;
                employeePermissionService.getEmployeePermissions(empid, pageid, flag).then(function(response) {
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                        if (type === 'grid') {
                            var i = 1;
                            model.pageSize = 10;
                            model.TotalRows = (response.data[0]).length;
                            model.modelarraydynamic = [];
                            _.map((response.data[0]), function(item) {
                                item.ViewPages = item.ViewPages === 1 ? true : false;
                                item.sno = i;
                                i++;
                            });
                            // model.modelarraydynamic = response.data[0];
                            model.data = (response.data[0]);
                        } else {
                            model.exportarray = [];
                            model.exportarray = response.data[0];
                            var options = {
                                headers: true,
                                columns: [{
                                    columnid: 'PageID',
                                    title: 'PageID'
                                }, {
                                    columnid: 'PageName',
                                    title: 'Page Name'
                                }, {
                                    columnid: 'ViewPages',
                                    title: 'View Pages'
                                }]
                            };
                            alasql('SELECT PageID as PageID,PageName as [Page Name],ViewPages as [View Pages] INTO  XLSX("PagesPermission.xlsx",?) FROM ?', [options, model.exportarray]);
                        }

                    }
                });
            } else {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please Select Employeename', 3500);

            }
        };
        model.exportexcel = function(topage) {
            model.submitemployeepermission(model.profileownerid, 'excel');
        };
        model.updatepagepermission = function() {
            var arrays = [];
            debugger;
            $filter('filter')(model.data, function(o) {
                if (o.ViewPages === true) {
                    arrays.push(o.PageID);
                }
                return arrays;
            });
            console.log(arrays);
            var pageids = arrays !== undefined && arrays !== "" && arrays !== null && arrays.length > 0 ? arrays.toString() : '';
            employeePermissionService.getEmployeePermissions(model.profileownerid, pageids, 1).then(function(response) {
                alerts.timeoutoldalerts(model.scope, 'alert-success', 'Updated Successfully', 3500);
            });

        };
        return model;
    }
})();