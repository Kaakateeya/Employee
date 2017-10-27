(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('noProfilegradingModel', factory);

    factory.$inject = ['noProfilegradingService', 'helperservice', 'complex-grid-config', 'alert', 'modelpopupopenmethod', '$timeout'];

    function factory(noProfilegradingService, helpService, configgrid, alertss, modelpopupopenmethod, timeout) {

        var model = {};
        model.grid1 = {};
        model.scope = {};
        model.applicationStatusarray = [];
        model.Castearray = [];
        model.ProfileOwnerarray = [];
        model.Brancharray = [];
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
            { "label": "--Select--", "title": "--Select--", "value": 0 },
            { "label": "A", "title": "A", "value": 216 },
            { "label": "B", "title": "B", "value": 217 },
            { "label": "C", "title": "C", "value": 218 },
            { "label": "D", "title": "D", "value": 219 }
        ];


        model.MyProfilePageLoad = function() {
            if (model.applicationStatusarray.length === 0) {
                helpService.getMyprofilebind(1, 2, '').then(function(response) {

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
                                model.branch = [];



                                break;
                        }
                    });
                });
            }
        };

        model.reset = function() {

            model.profileID = '';
            model.gradingType = '';
            model.grading = 0;
            model.caste = '';
            model.ApplicationStatus = [54];
            model.MyProfilePageLoad();
            model.paidType = 'N';
            model.rbtnGender = '';
            model.ProfileOwner = '';
            model.rbtnPaymentStatus = '';
            model.dorFrom = '';
            model.dorTo = '';
            model.isConfidential = '';
            model.excelData = [];
            timeout(function() {
                model.branch = [319, 320, 321, 322, 323, 324, 325, 326, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344];
            }, 1000);

        };
        model.returnProfileIDTemplate = function(row) {
            var paidstatusclass = row.IsPaidMember === 372 ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "' href='javascript:void(0);' ng-click='model.ViewProfile(" + JSON.stringify(row.ProfileID) + ");'>" + row.ProfileID + "</a>";
            return paid;
        };


        model.getNogradingprofiles = function(to, type) {
            model.excelData = [];
            model.grid1.columns = [
                { text: 'Sno', key: 'sno', type: 'label' },
                { text: 'ProfileID', key: 'ProfileID', type: 'morelinks', templateUrl: model.returnProfileIDTemplate },
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
                Confidential: model.isConfidential === true ? 1 : 0,
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
                PageNumber: to,
                flag: 0
            };

            model.gradetxt = model.paidType === 'E' ? 'Edit grading' : 'Grading';

            noProfilegradingService.getNoProfileGradeProfiles(inobj).then(function(response) {
                if ((response.data[0]).length > 0) {

                    model.panelbodyhide = false;
                    model.grid1.TotalRows = (response.data[1])[0].TotalRows;
                    model.grid1.data = (response.data[0]);
                    var i = 1;
                    model.excelData = (response.data[0]);
                    _.map((response.data[0]), function(item) {
                        if (to === 1) {
                            item.sno = i;
                            i++;
                        } else {
                            item.sno = to * 100 + i;
                            i++;
                        }
                    });

                } else {
                    if (to === 1) {
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
            return "<a>" + model.gradetxt + "</a>";
        };

        model.showGradingPopup = function(row) {

            model.Familygrading = 0;
            model.photoGrading = 0;
            model.educationGrading = 0;
            model.professionGrading = 0;
            model.propertyGrading = 0;
            model.upgradeCustID = row.cust_id;
            model.profileIDpopup = row.ProfileID;

            noProfilegradingService.GetDataStaging(row.cust_id).then(function(response) {
                if (response.data && response.data.length) {
                    _.each(response.data, function(item) {
                        if (item.length > 0 && item[0].TableName === 'GradingDetails') {
                            model.educationGrading = item[0].EducationGrade;
                            model.Familygrading = item[0].FamilyGrade;
                            model.photoGrading = item[0].PhotoGrade;
                            model.professionGrading = item[0].ProfessionGrade;
                            model.propertyGrading = item[0].PropertyGrade;
                        }
                    });
                }
            });

            modelpopupopenmethod.showPopup('gradingPopup.html', model.scope, 'md', "matchmeting");
        };

        model.closemainpopup = function() {
            modelpopupopenmethod.closepopup();
        };

        model.updateGrades = function(row) {
            var obj = {
                GFamily: model.Familygrading,
                GPhotos: model.photoGrading,
                GEducation: model.educationGrading,
                GProfession: model.professionGrading,
                GProperty: model.propertyGrading,
                CustID: model.upgradeCustID,
                EmpID: model.empid
            };

            noProfilegradingService.UpdateGrading(obj).then(function(response) {
                model.closemainpopup();
                if (response.data && parseInt(response.data) === 1) {
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Grading saved successfully', 3500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updation Failed', 3500);
                }
            });
        };

        model.grid1.ViewProfile = model.ViewProfile = function(ProfileID) {
            window.open('/Viewfullprofile/' + ProfileID + '/0', '_blank');
        };
        model.grid1.pagechange = function(val) {
            model.getNogradingprofiles(val);
        };

        model.grid1.exportexcel = function(topage) {
            debugger;
            model.exportarray = [];
            model.exportarray = model.excelData;
            var options = {
                headers: true
            };
            alasql('SELECT ProfileID,FirstName,LastName,CasteName,PhotoGreade,FamilyGrade,PropertyGrade,EducationGrade,ProfessionGrade INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.exportarray]);
            // model.getNogradingprofiles(parseInt(topage / 100), 'excel');
        };


        return model;
    }
})();