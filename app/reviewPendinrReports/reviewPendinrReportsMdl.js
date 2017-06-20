(function() {
    'use strict';

    function factory(reviewPendinrReportsService, configgrid, helpService, alerts) {
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
            model.MyProfilePageLoad = function() {
                reviewPendinrReportsService.getMyprofilebind(1, 2, '').then(function(response) {
                    model.mpObj.ddlProfileOwner = model.empid;
                    model.applicationStatusarray = [];
                    model.Castearray = [];
                    model.ProfileOwnerarray = [];
                    model.Brancharray = [];
                    model.ProfileOwnerarraysingle = [];
                    model.ProfileOwnerarraysingle = [{ "label": '--Select--', "title": '--Select--', "value": 0 }];
                    model.mpObj.ddlProfileOwner = [parseInt(model.empid)];
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
                                model.ProfileOwnerarraysingle.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                            case "Branch":
                                model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                        }
                    });
                });
            };
            model.returnnullvalue = function(value) {
                var obj = helpService.checkstringvalue(value) && (value.toString()) !== "0" && (value.toString()) !== 0 ? (value.toString()) : null;
                return obj;
            };

            model.populateGridDropdownsreview = function(arr) {
                _.each(arr, function(item) {
                    model['ddlReviewedEmpID' + item.Row] = item.ReviewedEmpID ? item.ReviewedEmpID : 0;
                });
            };
            model.ProfileIdTemplateDUrl = function(row) {
                // model['ddlReviewedEmpID' + row.Row] = (row.ReviewedEmpID) !== undefined && row.ReviewedEmpID !== null ? row.ReviewedEmpID : 0;
                var paidstatusclass = row.IsPaidMember === 1 ? 'paidclass' : 'unpaid';
                var paid = row.ProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>" : "";
                return paid;
            };
            model.ViewProfile = function(row) {
                window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
            };
            model.assignaction = function(row) {
                var owner = '<a>Escalate</a>';
                return owner;
            };
            model.reassignmethod = function(row) {
                var obj = {
                    CustID: row.CustID !== "" ? row.CustID : null,
                    EmpID: model['ddlReviewedEmpID' + row.Row] !== "" && model['ddlReviewedEmpID' + row.Row] !== 0 && model['ddlReviewedEmpID' + row.Row] !== null && model['ddlReviewedEmpID' + row.Row] !== undefined ? model['ddlReviewedEmpID' + row.Row] : null,
                    i_Reviewpending: 1
                };
                reviewPendinrReportsService.ReviewpendingReassign(obj).then(function(response) {
                    if (parseInt(response.data) === 1) {
                        alerts.timeoutoldalerts(model.scope, 'alert-success', 'Review Assigned Successfully', 3000);
                    } else {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Review Assigned Fail', 3000);
                    }
                });
            };
            model.Reassign = function(row) {
                var mobj = {
                    CustID: row.CustID !== "" ? row.CustID : null,
                    EmpID: row.ReviewedEmpID !== "" && row.ReviewedEmpID !== 0 && row.ReviewedEmpID !== null && row.ReviewedEmpID !== undefined ? row.ReviewedEmpID : null,
                    i_Reviewpending: 0
                };
                reviewPendinrReportsService.ReviewpendingReassign(mobj).then(function(response) {
                    if (parseInt(response.data) === 1) {
                        alerts.timeoutoldalerts(model.scope, 'alert-success', 'Review Assigned Successfully', 3000);
                    } else {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Review Assigned Fail', 3000);
                    }
                });
            };
            model.reassignlink = function(row) {
                var link = '<a href="javascript:void(0)">Reassign</a>';
                return link;
            };
            model.columns = [
                { text: 'Sno', key: 'Row', type: 'label' },
                { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                { text: 'NAME', key: 'NAME', type: 'label' },
                { text: 'DOR', key: 'DOR', type: 'label' },
                { text: 'Owner of the profile', key: 'OwnerOftheProfile', type: 'label' },
                { text: 'Reviewed by', key: 'ReviewedBy', type: 'label' },
                { text: 'Assigned Date', key: 'AssignedDate', type: 'label' },
                { text: 'Assigned for Review', key: 'ReviewedEmpID', type: 'dropdownlink', model: 'ddlReviewedEmpID' },
                { text: '', key: '', type: 'customlink', templateUrl: model.reassignlink, method: model.Reassign },
                { text: 'Actions', key: 'NAME', type: 'customlink', templateUrl: model.assignaction, method: model.reassignmethod }
            ];
            model.reviewpendingsubmit = function(obj, from, to, type) {
                model.opendiv = false;
                var mobj = {
                    EmpID: parseInt(model.empid),
                    genderId: obj.rdnGender !== "" ? obj.rdnGender : "1,2",
                    isPaid: obj.rdntypeofprofile !== "" ? obj.rdntypeofprofile : "1,2",
                    IsConfidential: obj.chkconfidential === true ? 1 : 0,
                    ReviewFromDate: obj.txtAssignedFromDate !== "" ? obj.txtAssignedFromDate : null,
                    ReviewToDate: obj.txtAssignedtoDate !== "" ? obj.txtAssignedtoDate : null,
                    SectionID: 1,
                    ReviewStatusID: 1,
                    ISRegistarion: obj.rdnreviewpending === 1 ? 1 : 0,
                    ProfileStatusID: obj.ddlApplicationStatus !== "" ? model.returnnullvalue(obj.ddlApplicationStatus) : null,
                    Casteid: obj.ddlCaste !== "" ? model.returnnullvalue(obj.ddlCaste) : null,
                    Branchid: obj.ddlBranch !== "" ? model.returnnullvalue(obj.ddlBranch) : null,
                    ProfileReviewedEmpID: obj.ddlProfileowner !== "" ? model.returnnullvalue(obj.ddlProfileowner) : null,
                    PageFrom: from,
                    PageTo: to
                };
                reviewPendinrReportsService.submitreviewpending(mobj).then(function(response) {
                    console.log(response.data);
                    model.reviewpendingarray = [];
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                        if (from === 1) {
                            model.TotalRows = response.data[0][0].TotalRows;
                        }
                        // _.each(response.data[0], function(item) {
                        model.reviewpendingarray = response.data[0];
                        // });
                        if (type === 'grid') {
                            model.data = model.reviewpendingarray;
                        } else {
                            model.exportarray = [];
                            model.exportarray = response.data[0];
                            var options = {
                                headers: true,
                                columns: [{
                                        columnid: 'ProfileID',
                                        title: 'ProfileID'
                                    }, {
                                        columnid: 'NAME',
                                        title: 'NAME'
                                    }, {
                                        columnid: 'DOR',
                                        title: 'DOR'
                                    },
                                    {
                                        columnid: 'OwnerOftheProfile',
                                        title: 'OwnerOftheProfile'
                                    },
                                    {
                                        columnid: 'ReviewedBy',
                                        title: 'ReviewedBy'
                                    },
                                    {
                                        columnid: 'AssignedDate',
                                        title: 'AssignedDate'
                                    }
                                ]
                            };
                            alasql('SELECT ProfileID,NAME,DOR,ReviewTcktID,OwnerOftheProfile as OwnerOftheProfile,ReviewedBy as ReviewedBy,AssignedDate as AssignedDate INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.exportarray]);
                        }

                        model.populateGridDropdownsreview(model.reviewpendingarray);
                    }
                });
            };
            model.Reassign = function() {

            };
            model.pagechange = function(val) {
                var to = val * 10;
                var from = val === 1 ? 1 : to - 9;
                var valuechange = val === 1 ? 1 : val;
                model.reviewpendingsubmit(model.mpObj, from, to, 'grid');
            };
            model.exportexcel = function(topage) {
                model.reviewpendingsubmit(model.mpObj, 1, topage, 'excel');
            };
            return model;
        };
    }
    angular
        .module('Kaakateeya')
        .factory('reviewPendinrReportsModel', factory);

    factory.$inject = ['reviewPendinrReportsService', 'complex-grid-config', 'helperservice', 'alert'];
})();