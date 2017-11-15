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
        model.grid.showpaging = false;
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
        model.joinArray = function(val) {
            var str = null;
            if (val && val.length > 0) {
                str = val.join(',');
            }
            return str;
        };
        model.returnint = function(val) {
            var dd;
            if (val === true) {
                dd = 1;
            } else {
                dd = 0;
            }
            return dd;
        };
        model.empworkpendingreport = function(from, to) {
            model.grid.columns = [
                { text: 'Sno', key: 'sno', type: 'label' },
                { text: 'Noserive', key: 'ServiceDrofCust_ID', type: 'label' },
                { text: 'Paymentexpired', key: 'PayExpCust_ID', type: 'label' },
                { text: 'NoPhotos', key: 'phoCust_ID', type: 'label' },
                { text: 'Notverifiedcontacts', key: 'unpaidCust_ID', type: 'label' },
                { text: 'Unpaid', key: 'unpaidCust_ID', type: 'label' },
                { text: 'Inactive', key: 'inactiveCust_ID', type: 'label' },
                { text: 'EmailBounce', key: 'inactiveCust_ID', type: 'label' },
                { text: 'Presently in India', key: 'inactiveCust_ID', type: 'label' },
                { text: 'No SA form', key: 'inactiveCust_ID', type: 'label' },
            ];
            var obj = {
                strBranch: model.joinArray(model.empbranch),
                strEmpIDs: model.joinArray(model.employeename),
                intRegion: model.empregion !== "" && model.empregion !== undefined && model.empregion !== null ? parseInt(model.empregion) : '',
                intStartIndex: from,
                intEndIndex: 100,
                intServiceDate: model.returnint(model.noservice),
                intPaymentExp: model.returnint(model.Paymentexp),
                intNoPhoto: model.returnint(model.nophotos),
                intNOtYetVerified: model.returnint(model.notyetverify),
                intUnPaid: model.returnint(model.unpaid),
                intInactive: model.returnint(model.inactive),
                intEmailBounce: model.returnint(model.emailbounce),
                intNoSAFirm: model.returnint(model.nosaform)
            };
            matchfollowupReportService.EmployeeReportsCounts(obj).then(function(response) {
                console.log(response);
                if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                    var i = 1;
                    model.grid.pageSize = 10;
                    model.grid.showpaging = true;
                    _.map((response.data[0]), function(item) {
                        if (from === 1) {
                            item.sno = i;
                            i++;
                        } else {
                            item.sno = (from - 1) + i;
                            i++;
                        }
                    });
                    model.grid.data = (response.data[0]);
                }
            });
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