(function(angular) {
    'use strict';

    function factory(assignSettingsService, configgrid, filter, helpService) {
        return function() {
            var model = {};
            model = configgrid;
            model.mpObj = {};
            model.opendiv = true;

            //

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
                { text: 'Sno', key: 'SNO', type: 'label' },
                { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                { text: 'Profile owner', key: 'cust_id', type: 'customlink', templateUrl: model.selectdropdownowner, method: model.ViewProfile },
                { text: 'Marketed by', key: 'cust_id', type: 'customlink', templateUrl: model.selectdropdownowner, method: model.ViewProfile },
                { text: 'Reviewed by', key: 'cust_id', type: 'customlink', templateUrl: model.selectdropdownowner, method: model.ViewProfile },
                { text: 'Actions', key: 'cust_id', type: 'customlink', templateUrl: model.assignaction },
                { text: 'Payment ticket', key: 'PaymentTcktID', type: 'label' },
                { text: 'Review ticket', key: 'ReviewTcktID', type: 'label' },
                { text: 'Photo ticket', key: 'PhotoTcktID', type: 'label' }
            ];
            model.MyProfilePageLoad = function() {
                assignSettingsService.getMyprofilebind(1, 2, '').then(function(response) {
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
            model.assignsettingssubmit = function(obj, from, to, type) {
                debugger;
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
                    PageSize: 10,
                    PageNumber: 1,
                    intlowerBound: 1,
                    intUpperBound: 10,
                    PaymentStatus: obj.rdnPayments !== "" ? obj.rdnPayments : null
                };
                assignSettingsService.submitassignsettings(mobj).then(function(response) {
                    console.log(response);
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                        if (from === 1) {
                            model.TotalRows = response.data[0][0].TotalRows;
                        }
                        _.each(response.data[1], function(item) {
                            model.assignsettingsdata.push(item);
                        });
                        model.data = model.assignsettingsdata;

                    }
                });
            };

            return model;
        };
    }
    angular
        .module('Kaakateeya')
        .factory('assignSettingsModel', factory);

    factory.$inject = ['assignSettingsService', 'complex-grid-config', '$filter', 'helperservice'];
})(angular);