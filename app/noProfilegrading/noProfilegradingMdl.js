(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('noProfilegradingModel', factory);

    factory.$inject = ['noProfilegradingService', 'helperservice', 'complex-grid-config', 'alert', 'modelpopupopenmethod'];

    function factory(noProfilegradingService, helpService, configgrid, alertss, modelpopupopenmethod) {

        var model = {};
        model.grid1 = {};
        model.scope = {};
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
            model.ApplicationStatus = [54];
            model.MyProfilePageLoad();
            model.paidType = 'N';
            model.rbtnGender = '';
            model.rbtnPaymentStatus = '';


        };


        model.getNogradingprofiles = function() {

            model.grid1.columns = [
                { text: 'ProfileID', key: 'ProfileID', type: 'label' },
                { text: 'First Name', key: 'FirstName', type: 'label' },
                { text: 'Surname', key: 'LastName', type: 'label' },
                { text: 'caste', key: 'CasteName', type: 'label' },
                { text: 'Photo grade', key: 'PhotoGreade', type: 'label' },
                { text: 'family grade', key: 'FamilyGrade', type: 'label' },
                { text: 'Property grade', key: 'PropertyGrade', type: 'label' },
                { text: 'Education grade', key: 'EducationGrade', type: 'label' },
                { text: 'Profession grade', key: 'ProfessionGrade', type: 'label' },
                { text: 'Action', key: 'ProfileID', type: 'customlink', templateUrl: model.gradeTemplate, method: model.showGradingPopup }
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
                PaymentStatus: model.rbtnPaymentStatus ? model.rbtnPaymentStatus : null,
                Confidential: model.isConfidential,
                GradeID: model.grading,
                strApplicationStatus: model.joinArray(model.ApplicationStatus),
                GradingType: model.gradingType,
                strBranch: model.joinArray(model.branch),
                strCaste: model.joinArray(model.caste),
                strOwnerOfTheProfile: model.joinArray(model.ProfileOwner),
                StartDate: model.dorFrom ? moment(model.dorFrom).format('MM-DD-YYYY') : null,
                EndDate: model.dorTo ? moment(model.dorTo).format('MM-DD-YYYY') : null,
                From: null,
                To: null,
                PageSize: 100,
                PageNumber: 1,
                flag: 0
            };

            noProfilegradingService.getNoProfileGradeProfiles(inobj).then(function(response) {
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

        model.gradeTemplate = function(row) {
            return "<a>Grading</a>";
        };

        model.showGradingPopup = function() {
            modelpopupopenmethod.showPopup('gradingPopup.html', model.scope, 'lg', "matchmeting");
        };

        model.closemainpopup = function() {
            modelpopupopenmethod.closepopup();
        };

        return model;
    }
})();