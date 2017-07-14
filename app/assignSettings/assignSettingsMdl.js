(function(angular) {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('assignSettingsModel', ['assignSettingsService', 'complex-grid-config', '$filter', 'helperservice', 'alert', '$timeout', 'modelpopupopenmethod', 'SelectBindServicereg', 'authSvc',
            function(assignSettingsService, configgrid, filter, helpService, alerts, timeout, modelpopupopenmethod, SelectBindServicereg, authSvc) {
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


                model.singlegrid1 = {};
                model.singlegrid2 = {};
                model.singlegrid3 = {};
                model.showsearchrows = true;
                model.showsearch = true;
                model.showpaging = false;
                model.showClientpaging = false;
                model.myprofileexcel = false;
                model.normalexcel = false;
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
                    // <br><a href='javascript:void(0);' ng-click='model.getDuplicate(" + JSON.stringify(row.ProfileID) + ");'>Duplicate profiles</a>
                    var paid = row.ProfileID !== undefined ? "<a href='javascript:void(0);' ng-click='model.ViewProfile(" + JSON.stringify(row.ProfileID) + ")' class='" + paidstatusclass + "'>" + row.ProfileID + "</a>" : "";
                    return paid;
                };

                function dataMapper(arr) {
                    _.map(arr, function(item) {
                        item.ddlowner = _.where(model.ProfileOwnerarray, { value: parseInt(item.ProfileOwner) })[0];
                    });
                    return arr;
                }

                model.checkPopulateval = function(val) {
                    return (val && _.where(model.ProfileOwnerarray, { value: parseInt(val) }).length > 0) ? val : 0;
                };
                model.ViewProfile = function(ProfileID) {
                    window.open('/Viewfullprofile/' + ProfileID + '/0', '_blank');
                };
                model.assignaction = function(row) {
                    var checkOwner = _.where(model.ProfileOwnerarray, { value: parseInt(row.ProfileOwner) })[0];
                    var str = checkOwner ? 'Reassign' : 'Assign';
                    var owner = '<a> ' + str + '</a>';
                    return owner;
                };
                model.Marketingticketid = function(row) {
                    return row.Marketingticketid ? "<a href='javascript:void(0);'>" + row.Marketingticketid + "</a>" : "--";
                };
                model.EnteredBytext = function(row) {
                    return row.EnteredBy !== undefined && row.EnteredBy !== null && row.EnteredBy !== "" ? row.EnteredBy : "--";
                };

                model.assignsettingsubmit = function(row) {
                    var PreviousOwner;
                    var checkOwner = row.ProfileOwner ? _.where(model.ProfileOwnerarray, { value: parseInt(row.ProfileOwner) })[0] : undefined;
                    if (checkOwner) {
                        PreviousOwner = checkOwner.label;
                    }
                    var obj = {
                        ProfileID: row.ProfileID !== "" ? row.ProfileID : null,
                        CustID: row.cust_id !== "" ? row.cust_id : null,
                        ModifiedEMPID: parseInt(model.empid),
                        ProfileOwner: row.ddlowner.value,
                        MarketingOwner: row.ddlowner.value,
                        ReviewOwner: row.ddlowner.value
                    };
                    assignSettingsService.assignsubmit(obj).then(function(response) {
                        if (parseInt(response.data) === 1) {

                            // msg, tktID, empid, assignEmpid
                            SelectBindServicereg.memoSubmit((PreviousOwner ? PreviousOwner + ' profile ' : 'This profile ') + 'assigned to ' + row.ddlowner1 + ' and  Assigned by ' + authSvc.LoginEmpName(), row.TicketID, model.empid, row.ddlowner.value).then(function(response) {
                                if (parseInt(response.data) === 1) {

                                }
                            });

                            alerts.timeoutoldalerts(model.scope, 'alert-success', 'Profile Assigned Successfully', 3000);
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Profile Assigned Fail', 3000);
                        }
                    });
                };

                model.tickethistorypopup = function(row) {
                    model.marketingTicketid = row.TicketID;
                    modelpopupopenmethod.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");
                };

                model.columns = [
                    { text: 'Sno', key: 'SNO', type: 'label' },
                    { text: 'ProfileID', key: 'ProfileID', type: 'morelinks', templateUrl: model.ProfileIdTemplateDUrl },
                    { text: 'Profile owner', key: 'ProfileOwner', type: 'autocomplete', model: 'ddlProfileowner' },
                    { text: 'Action', key: 'cust_id', type: 'customlinkValidation', templateUrl: model.assignaction, method: model.assignsettingsubmit, dependColumn: 'ddlowner' },
                    { text: 'EnteredBy', key: 'EnteredBy', type: 'customlink', templateUrl: model.EnteredBytext },
                    { text: 'Branch-Dor', key: 'BranchName', type: 'label' },
                    { text: 'Caste', key: 'Caste', type: 'label' },
                    { text: 'Marketing Ticket', key: 'Marketingticketid', type: 'customlink', templateUrl: model.Marketingticketid, method: model.tickethistorypopup },
                ];

                model.MyProfilePageLoad = function() {
                    assignSettingsService.getMyprofilebind(1, 2, '').then(function(response) {
                        model.applicationStatusarray = [];
                        model.Castearray = [];
                        model.ProfileOwnerarray = [];
                        model.Brancharray = [];
                        // model.ProfileOwnerarray = [{ "label": '--Select--', "title": '--Select--', "value": 0, "display": '--Select--' }];
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
                        // var vals = [];
                        _.each(model.Brancharray, function(item) {
                            model.mpObj.ddlBranch.push(item.value);
                        });

                        // timeout(function() {
                        //     debugger;
                        //     model.mpObj.ddlBranch = vals;
                        // }, 500);

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
                        if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data[0] !== undefined && response.data[0] !== null && response.data[0].length > 0) {
                            model.opendiv = false;
                            if (from === 1) {
                                model.TotalRows = response.data[0][0].TotalRows;
                            }
                            if (type === 'grid') {
                                model.data = dataMapper(response.data[0]);
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
                        } else {
                            if (from === 1) {
                                model.data = [];
                                model.TotalRows = "";
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Sorry,No Records Found', 3000);
                            }
                        }
                        // model.populateGridDropdowns(response.data[0]);
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

                model.singlegrid1.columns = [
                    { text: 'ProfileID', key: 'ProfileID', type: 'label' },
                    { text: 'Name', key: 'Name', type: 'label' },
                    { text: 'DOR-Branch', key: 'DOR', type: 'label' },
                    { text: 'Profile owner', key: 'EmpName', type: 'label' }
                ];
                model.singlegrid3.columns = model.singlegrid2.columns = model.singlegrid1.columns;
                model.getDuplicate = function(profileID) {
                    model.singlegrid1.sdata = [];
                    model.singlegrid2.sdata = [];
                    model.singlegrid3.sdata = [];
                    model.dupTotalRecords = 0;
                    modelpopupopenmethod.showPopupphotopoup('duplicataProfilesPopup.html', model.scope, 'lg', "modalclassdashboardphotopopupassign");
                    assignSettingsService.getDuplicatProfiles(profileID).then(function(response) {
                        console.log(response.data);
                        model.singlegrid1.sdata = response.data[0];
                        model.singlegrid2.sdata = response.data[1];
                        model.singlegrid3.sdata = response.data[2];
                        model.dupTotalRecords = response.data[0].length > 0 ? (response.data[0])[0].SimilarCount : (response.data[1].length > 0 ? (response.data[1])[0].SimilarCount : (response.data[2].length > 0 ? (response.data[2])[0].SimilarCount : 0));
                    });
                };
                model.closeAssign = function() {
                    modelpopupopenmethod.closepopuppoptopopup();
                };
                return model;
            }
        ]);
})(angular);