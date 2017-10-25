(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('noProfilegradingModel', factory);

    factory.$inject = ['noProfilegradingService', 'helperservice', 'complex-grid-config'];

    function factory(noProfilegradingService, helpService, configgrid) {

        var model = {};
        model.grid1 = {};
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };
        model.gradingTypeArr = [
            { label: 'FamilyGrade', title: 'FamilyGrade', value: 441 },
            { label: 'PhotoGrade', title: 'PhotoGrade', value: 442 },
            { label: 'EducationGrade', title: 'EducationGrade', value: 443 },
            { label: 'ProfessionGrade', title: 'ProfessionGrade', value: 444 },
            { label: 'PropertyGrade', title: 'PropertyGrade', value: 445 }
        ];
        model.profileGrade = [
            { "label": "--Select--", "title": "--Select--", "value": '' },
            { "label": "A", "title": "A", "value": 216 },
            { "label": "B", "title": "B", "value": 217 },
            { "label": "C", "title": "C", "value": 218 },
            { "label": "D", "title": "D", "value": 219 }
        ];
        model.MyProfilePageLoad = function() {
            helpService.getMyprofilebind(1, 2, '').then(function(response) {
                model.applicationStatusarray = [];
                model.Castearray = [];
                model.ProfileOwnerarray = [];
                model.Brancharray = [];
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
            });
        };

        model.reset = function() {
            model.ddlApplicationStatus = [54];
            model.MyProfilePageLoad();
        };


        model.getNogradingprofiles = function() {

            model.grid1.columns = [
                { text: 'ProfileID', key: 'BrideProfileID', type: 'morelinks', templateUrl: model.profileidmehod },
                { text: 'Name', key: 'BrideName', type: 'morelinks', templateUrl: model.nemeMethod },
                { text: 'Caste', key: 'BrideCaste', type: 'morelinks', templateUrl: model.casteMethod },
                { text: 'Owner', key: 'BrideOwner', type: 'morelinks', templateUrl: model.ownerMethod },
                { text: 'paid Type', key: 'GroomCaste', type: 'morelinks', templateUrl: model.showbuttons },
                { text: 'History', key: 'GroomName', type: 'customlink', templateUrl: model.showHistrybuttons, method: model.openPouptoedit }
            ];

            model.grid1.showsearchrows = true;
            model.grid1.showsearch = true;
            model.grid1.showpaging = true;
            model.grid1.myprofileexcel = true;
            model.grid1.normalexcel = true;

            var inobj = {
                TypeOFGrade: model.paidType ? model.paidType : 'N',
                StrProfileID: model.profileID,
                Gender: model.rbtnGender,
                PaymentStatus: model.aaa,
                Confidential: model.aaa,
                GradeID: model.aaa,
                strApplicationStatus: model.joinArray(model.ApplicationStatus),
                GradingType: model.aaa,
                strBranch: model.joinArray(model.branch),
                strCaste: model.joinArray(model.caste),
                strOwnerOfTheProfile: model.joinArray(model.ProfileOwner),
                StartDate: moment(model.dorFrom).format('MM-DD-YYYY'),
                EndDate: moment(model.dorTo).format('MM-DD-YYYY'),
                From: model.aaa,
                To: model.aaa,
                PageSize: model.aaa,
                PageNumber: model.aaa,
                flag: model.aaa
            };

            settlementPageNewService.settledInfo(inobj).then(function(response) {
                if ((response.data[0]).length > 0) {
                    model.panelbodyhide = false;
                    model.grid1.TotalRows = (response.data[0])[0].TotalRows;
                    model.grid1.data = (response.data[0]);
                } else {
                    if (from === 1) {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 3500);
                    }
                }
            });

        };

        model.joinArray = function(val) {
            var str = null;
            if (val && val.length > 0) {
                str = val.join(',');
            }
            return str;
        };

        return model;
    }
})();