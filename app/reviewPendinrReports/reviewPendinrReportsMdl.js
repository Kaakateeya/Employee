(function() {
    'use strict';

    function factory(reviewPendinrReportsService, configgrid, helpService) {
        return function() {
            var model = {};
            model = configgrid;
            model.mpObj = {};
            model.opendiv = true;

            model.showsearchrows = true;
            model.showsearch = true;
            model.showpaging = true;
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
            model.MyProfilePageLoad = function() {
                reviewPendinrReportsService.getMyprofilebind(1, 2, '').then(function(response) {
                    model.mpObj.ddlProfileOwner = model.empid;
                    model.applicationStatusarray = [];
                    model.Castearray = [];
                    model.ProfileOwnerarray = [];
                    model.Brancharray = [];
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
            model.ProfileIdTemplateDUrl = function(row) {
                var paidstatusclass = row.paid === 1 ? 'paidclass' : 'unpaid';
                var paid = row.ProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>" : "";
                return paid;
            };
            model.ViewProfile = function(row) {
                window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
            };
            model.selectdropdownowner = function(row) {
                var owner = '<select multiselectdropdown multiple  class="smalldropdown" ng-model="model.mpObj.ddlApplicationStatus" ng-options="item.value as item.label for item in model.ProfileOwnerarray"></select>';
                // var owner = '<a>Assign</a>';
                return owner;
            };
            model.assignaction = function(row) {
                var owner = '<a>Assign</a>';
                return owner;
            };
            model.columns = [
                { text: 'Sno', key: 'Row', type: 'label' },
                { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                { text: 'NAME', key: 'NAME', type: 'label' },
                { text: 'DOR', key: 'DOR', type: 'label' },
                { text: 'Owner of the profile', key: 'OwnerOftheProfile', type: 'label' },
                { text: 'Reviewed by', key: 'ReviewedBy', type: 'label' },
                { text: 'Assigned Date', key: 'AssignedDate', type: 'label' },
                { text: 'Assigned for Review', key: 'ReviewedEmpID', type: 'label' },
                { text: 'Actions', key: 'NAME', type: 'customlink', templateUrl: model.assignaction }
            ];
            model.reviewpendingsubmit = function(obj, from, to, type) {

                debugger;
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
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                        if (from === 1) {
                            model.TotalRows = response.data[0][0].TotalRows;
                        }
                        _.each(response.data[0], function(item) {
                            model.reviewpendingarray.push(item);
                        });
                        model.data = model.reviewpendingarray;
                    }
                });
            };
            return model;
        };
    }
    angular
        .module('Kaakateeya')
        .factory('reviewPendinrReportsModel', factory);

    factory.$inject = ['reviewPendinrReportsService', 'complex-grid-config', 'helperservice'];
})();