(function(angular) {
    'use strict';

    function factory(assignSettingsService, configgrid, filter, helpService, alerts) {
        return function() {
            var model = {};
            model = configgrid;
            model.mpObj = {};
            model.opendiv = true;
            model.showsearchrows = true;
            model.showsearch = true;
            model.showpaging = true;
            model.showClientpaging = false;
            model.myprofileexcel = true;
            model.normalexcel = true;
            model.gridTableshow = false;
            model.dateOptions = {
                changeMonth: true,
                changeYear: true,
                yearRange: "-40:+5",
                dateFormat: 'dd/mm/yy',
                minDate: null,
                maxDate: null
            };
            model.ProfileIdTemplateDUrl = function(row) {
                var paidstatusclass = row.IsPaidMember === 372 ? 'paidclass' : 'unpaid';
                var paid = row.ProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>" : "";
                return paid;
            };
            model.populateGridDropdowns = function(arr) {
                _.each(arr, function(item) {
                    model['ddlProfileowner' + item.SNO] = item.ProfileOwner ? item.ProfileOwner : 0;
                    model['ddlmarketingowner' + item.SNO] = item.MarketedOwner ? item.MarketedOwner : 0;
                    model['ddlreviweedowner' + item.SNO] = item.ReviewOwner ? item.ReviewOwner : 0;
                });
            };
            model.ViewProfile = function(row) {
                window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
            };
            model.assignaction = function(row) {
                var owner = '<a>Assign</a>';
                return owner;
            };

            model.PaymentTcktID = function(row) {
                return row.PaymentTcktID !== undefined && row.PaymentTcktID !== null && row.PaymentTcktID !== "" ? row.PaymentTcktID : "--";
            };
            model.ReviewTcktID = function(row) {
                return row.ReviewTcktID !== undefined && row.ReviewTcktID !== null && row.ReviewTcktID !== "" ? row.ReviewTcktID : "--";
            };
            model.PhotoTcktID = function(row) {
                return row.PhotoTcktID !== undefined && row.PhotoTcktID !== null && row.PhotoTcktID !== "" ? row.PhotoTcktID : "--";
            };
            model.assignsettingsubmit = function(row) {
                var obj = {
                    ProfileID: row.ProfileID !== "" ? row.ProfileID : null,
                    CustID: row.cust_id !== "" ? row.cust_id : null,
                    ModifiedEMPID: parseInt(model.empid),
                    ProfileOwner: model['ddlProfileowner' + row.SNO] !== "" ? model.returnnullvalue(model['ddlProfileowner' + row.SNO]) : null,
                    MarketingOwner: model['ddlmarketingowner' + row.SNO] !== "" ? model.returnnullvalue(model['ddlmarketingowner' + row.SNO]) : null,
                    ReviewOwner: model['ddlreviweedowner' + row.SNO] !== "" ? model.returnnullvalue(model['ddlreviweedowner' + row.SNO]) : null
                };
                assignSettingsService.assignsubmit(obj).then(function(response) {
                    if (parseInt(response.data) === 1) {
                        alerts.timeoutoldalerts(model.scope, 'alert-success', 'Profile Assigned Successfully', 3000);
                    } else {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Profile Assigned Fail', 3000);
                    }
                });
            };
            model.columns = [
                { text: 'Sno', key: 'SNO', type: 'label' },
                { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                { text: 'Profile owner', key: 'ProfileOwner', type: 'dropdown', model: 'ddlProfileowner' },
                { text: 'Marketed by', key: 'MarketedOwner', type: 'dropdown', model: 'ddlmarketingowner' },
                { text: 'Reviewed by', key: 'ReviewOwner', type: 'dropdown', model: 'ddlreviweedowner' },
                { text: 'Actions', key: 'cust_id', type: 'customlink', templateUrl: model.assignaction, method: model.assignsettingsubmit },
                { text: 'Payment ticket', key: 'PaymentTcktID', type: 'customlink', templateUrl: model.PaymentTcktID },
                { text: 'Review ticket', key: 'ReviewTcktID', type: 'customlink', templateUrl: model.ReviewTcktID },
                { text: 'Photo ticket', key: 'PhotoTcktID', type: 'customlink', templateUrl: model.PhotoTcktID }
            ];


            model.MyProfilePageLoad = function() {
                assignSettingsService.getMyprofilebind(1, 2, '').then(function(response) {
                    model.applicationStatusarray = [];
                    model.Castearray = [];
                    model.ProfileOwnerarray = [];
                    model.Brancharray = [];
                    model.ProfileOwnerarray = [{ "label": '--Select--', "title": '--Select--', "value": 0 }];
                    _.each(response.data, function(item) {
                        switch (item.CountryCode) {
                            case "Application Status":
                                model.applicationStatusarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Caste":
                                model.Castearray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Profile Owner":
                                model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Branch":
                                model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                        }
                    });
                    console.log(model.ProfileOwnerarray);

                });
            };
            model.returnnullvalue = function(value) {
                var obj = helpService.checkstringvalue(value) && (value.toString()) !== "0" && (value.toString()) !== 0 ? (value.toString()) : null;
                return obj;
            };
            model.assignsettingssubmit = function(obj, from, to, type, pagenumber, PageSize) {
                model.opendiv = false;
                if (from === 1) {
                    model.assignsettingsdata = [];
                    model.data = [];
                }
                var mobj = {
                    EmpID: parseInt(model.empid),
                    ProfileID: (obj.txtProfileID !== "") ? obj.txtProfileID : null,
                    Gender: obj.rdnGender !== "" ? obj.rdnGender : null,
                    boolIsConfidential: obj.chkconfidential === true ? true : false,
                    FromDate: obj.txtRegFromDate !== "" ? filter('date')(obj.txtRegFromDate, 'MM/dd/yyyy') : null,
                    ToDate: obj.txtRegtoDate !== "" ? filter('date')(obj.txtRegtoDate, 'MM/dd/yyyy') : null,
                    castes: obj.ddlCaste !== "" ? model.returnnullvalue(obj.ddlCaste) : null,
                    branches: obj.ddlBranch !== "" ? model.returnnullvalue(obj.ddlBranch) : null,
                    applicationstatus: obj.ddlApplicationStatus !== "" ? model.returnnullvalue(obj.ddlApplicationStatus) : null,
                    PageSize: PageSize,
                    PageNumber: pagenumber,
                    intlowerBound: from,
                    intUpperBound: to,
                    PaymentStatus: obj.rdnPayments !== "" ? obj.rdnPayments : null
                };
                assignSettingsService.submitassignsettings(mobj).then(function(response) {
                    console.log(response.data);
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                        if (from === 1) {
                            model.TotalRows = response.data[0][0].TotalRows;
                        }
                        if (type === 'grid') {
                            model.setData(response.data[1]);
                        } else {
                            model.exportarray = [];
                            model.exportarray = response.data[1];
                            var options = {
                                headers: true,
                                columns: [{
                                        columnid: 'ProfileID',
                                        title: 'ProfileID'
                                    }, {
                                        columnid: 'PaymentTcktID',
                                        title: 'PaymentTcktID'
                                    }, {
                                        columnid: 'ReviewTcktID',
                                        title: 'ReviewTcktID'
                                    },
                                    {
                                        columnid: 'PhotoTcktID',
                                        title: 'PhotoTcktID'
                                    }
                                ]
                            };
                            alasql('SELECT ProfileID,GenderID as Gender,PaymentTcktID,ReviewTcktID,PhotoTcktID INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.exportarray]);
                        }
                    }

                    model.populateGridDropdowns(response.data[1]);

                });
            };
            model.pagechange = function(val) {
                var to = val * 10;
                var from = val === 1 ? 1 : to - 9;
                var valuechange = val === 1 ? 1 : val;
                model.assignsettingssubmit(model.mpObj, from, to, 'grid', valuechange, 10);
            };
            model.exportexcel = function(topage) {
                model.assignsettingssubmit(model.mpObj, 1, topage, 'excel', 10000, 10);
            };
            return model;
        };
    }
    angular
        .module('Kaakateeya')
        .factory('assignSettingsModel', factory);

    factory.$inject = ['assignSettingsService', 'complex-grid-config', '$filter', 'helperservice', 'alert'];
})(angular);