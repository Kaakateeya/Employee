(function(angular) {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('assignSettingsModel', ['assignSettingsService', 'complex-grid-config', '$filter', 'helperservice', 'alert', '$timeout', function(assignSettingsService, configgrid, filter, helpService, alerts, timeout) {
            var model = {};
            model.mpObj = {};
            model.opendiv = true;
            model.showsearchrows = true;
            model.showsearch = true;
            model.showpaging = true;
            model.showClientpaging = false;
            model.myprofileexcel = true;
            model.normalexcel = true;
            model.gridTableshow = false;
            model.showplus = false;
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
                    model['ddlProfileowner' + item.SNO] = model.checkPopulateval(item.ProfileOwner);
                });
            };
            model.checkPopulateval = function(val) {
                return (val && _.where(model.ProfileOwnerarray, { value: parseInt(val) }).length > 0) ? val : 0;
            };
            model.ViewProfile = function(row) {
                window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
            };
            model.assignaction = function(row) {
                var owner = '<a>Assign</a>';
                return owner;
            };
            model.Marketingticketid = function(row) {
                return row.Marketingticketid !== undefined && row.Marketingticketid !== null && row.Marketingticketid !== "" ? row.Marketingticketid : "--";
            };
            model.EnteredBytext = function(row) {
                return row.EnteredBy !== undefined && row.EnteredBy !== null && row.EnteredBy !== "" ? row.EnteredBy : "--";
            };
            model.assignsettingsubmit = function(row) {
                debugger;
                var ProfileownerID = row ? (_.where(model.ProfileOwnerarray, { label: row.ddlowner }))[0].value : null;
                var obj = {
                    ProfileID: row.ProfileID !== "" ? row.ProfileID : null,
                    CustID: row.cust_id !== "" ? row.cust_id : null,
                    ModifiedEMPID: parseInt(model.empid),
                    ProfileOwner: ProfileownerID,
                    //model['ddlProfileowner' + row.SNO] !== "" ? model.returnnullvalue(model['ddlProfileowner' + row.SNO]) : null,
                    MarketingOwner: ProfileownerID,
                    // model['ddlProfileowner' + row.SNO] !== "" ? model.returnnullvalue(model['ddlProfileowner' + row.SNO]) : null,
                    ReviewOwner: ProfileownerID,
                    // model['ddlProfileowner' + row.SNO] !== "" ? model.returnnullvalue(model['ddlProfileowner' + row.SNO]) : null
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
                { text: 'Profile owner', key: 'ProfileOwner', type: 'autocomplete', model: 'ddlProfileowner' },
                { text: 'Actions', key: 'cust_id', type: 'customlink', templateUrl: model.assignaction, method: model.assignsettingsubmit },
                { text: 'Marketing Ticket', key: 'Marketingticketid', type: 'customlink', templateUrl: model.Marketingticketid },
                { text: 'Branch-Dor', key: 'BranchName', type: 'label' },
                { text: 'Caste', key: 'Caste', type: 'label' },
                { text: 'EnteredBy', key: 'EnteredBy', type: 'customlink', templateUrl: model.EnteredBytext }
            ];
            model.MyProfilePageLoad = function() {
                assignSettingsService.getMyprofilebind(1, 2, '').then(function(response) {
                    model.applicationStatusarray = [];
                    model.Castearray = [];
                    model.ProfileOwnerarray = [];
                    model.Brancharray = [];
                    model.ProfileOwnerarray = [{ "label": '--Select--', "title": '--Select--', "value": 0, "display": '--Select--' }];
                    _.each(response.data, function(item) {
                        switch (item.CountryCode) {
                            case "Application Status":
                                model.applicationStatusarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Caste":
                                model.Castearray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Profile Owner":
                                model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID, "display": item.Name });
                                break;
                            case "Branch":
                                model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                        }
                    });
                    model.mpObj.ddlApplicationStatus = [54];
                    model.mpObj.ddlCaste = [402];
                    model.mpObj.ddlBranch = [];
                    _.each(model.Brancharray, function(item) {
                        model.mpObj.ddlBranch.push(item.value);
                    });

                });
            };
            model.returnnullvalue = function(value) {
                var obj = helpService.checkstringvalue(value) && (value.toString()) !== "0" && (value.toString()) !== 0 ? (value.toString()) : null;
                return obj;
            };
            model.assignsettingssubmit = function(obj, from, to, type, pagenumber, PageSize) {
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
                    PaymentStatus: obj.rdnPayments && obj.rdnPayments !== "0" ? obj.rdnPayments : null
                };
                assignSettingsService.submitassignsettings(mobj).then(function(response) {
                    model.opendiv = false;
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                        if (from === 1) {
                            model.TotalRows = response.data[0][0].TotalRows;
                        }
                        if (type === 'grid') {
                            model.data = response.data[0];
                        } else {
                            model.exportarray = [];
                            model.exportarray = response.data[0];
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
                    model.populateGridDropdowns(response.data[0]);
                });
            };
            model.pagechange = function(val) {
                var to = val * 100;
                var from = val === 1 ? 1 : to - 99;
                var valuechange = val === 1 ? 1 : val;
                model.assignsettingssubmit(model.mpObj, from, to, 'grid', valuechange, 10);
            };
            model.exportexcel = function(topage) {
                model.assignsettingssubmit(model.mpObj, 1, topage, 'excel', 10000, 10);
            };
            model.reset = function() {
                model.assignsettingsdata = [];
                model.mpObj.rdnGender = "";
                model.mpObj.rdnPayments = "0";
                model.mpObj.txtProfileID =
                    model.mpObj.chkconfidential = '';
                model.mpObj.ddlApplicationStatus = [54];
                model.mpObj.ddlCaste = [402];
                _.each(model.Brancharray, function(item) {
                    model.mpObj.ddlBranch.push(item.value);
                });
                model.mpObj.txtRegFromDate = '';
                model.mpObj.txtRegtoDate = '';
            };
            return model;
        }]);
})(angular);