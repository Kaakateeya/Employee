(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('noProfilegradingModel', factory);

    factory.$inject = ['noProfilegradingService', 'helperservice'];

    function factory(noProfilegradingService, helpService) {

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

        return model;
    }
})();