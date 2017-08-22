(function(angular) {
    'use strict';

    function factory(editPartnerpreferenceService, authSvc, alertss, commonFactory, uibModal, stateParams) {
        var model = {};
        model.scope = {};
        //start declaration block
        model.partnerPrefArr = [];
        model.partnerObj = {};
        model.ageGapArr = [];
        model.partnerDescObj = {};
        var isSubmit = true;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //  model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.partnerDescription = '';
        //end declaration block
        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.pageload();
            return model;
        };
        model.pageload = function() {
            editPartnerpreferenceService.getPartnerPreferenceData(custID).then(function(response) {
                model.partnerPrefArr = response.data;
                model.partnerDescription = (model.partnerPrefArr.length > 0 && model.partnerPrefArr[0].PartnerDescripition !== undefined && model.partnerPrefArr[0].PartnerDescripition !== null) ? model.partnerPrefArr[0].PartnerDescripition : '';
                model.partnermodifiedby = (model.partnerPrefArr.length > 0 && model.partnerPrefArr[0].EmpLastModificationDate !== undefined && model.partnerPrefArr[0].EmpLastModificationDate !== null) ? model.partnerPrefArr[0].EmpLastModificationDate : '';
            });
        };
        model.removeSelect = function(data) {
            if (data[0] !== undefined && angular.lowercase(data[0].title) === '--select--') {
                data.splice(0, 1);
            }
            return data;
        };
        model.SplitstringintoArray = function(string) {
            var array = [];
            if (string !== null && string !== "") {
                _.each(string.split(','), function(item) {
                    array.push(parseInt(item));
                });
            }
            return array;
        };
        model.partnerprefPopulate = function(item) {
            isSubmit = true;
            model.partnerObj = {};
            model.popupdata = model.partnerPreference;
            model.popupHeader = 'Partnerprefernece details';
            if (item !== undefined) {
                model.eventType = 'edit';
                model.intCusID = item.intCusID;
                model.genderId = item.Gender === 'Female' ? 2 : 1;
                model.fromAgeId = item.Agemin;
                model.toAgeId = item.AgeMax;
                model.fromheightId = item.MinHeight;
                model.toheightId = item.MaxHeight;
                model.religionId = model.SplitstringintoArray(item.religionid);
                model.mothertongueId = model.SplitstringintoArray(item.MotherTongueID);
                model.casteId = model.SplitstringintoArray(item.casteid);
                model.subCasteId = model.SplitstringintoArray(item.subcasteid);
                model.maritalstatusId = item.maritalstatusid;
                model.eduCatgoryId = model.SplitstringintoArray(item.EducationCategoryID);
                model.eduGroupId = model.SplitstringintoArray(item.EducationGroupID);
                model.employedinId = model.SplitstringintoArray(item.ProfessionCategoryID);
                model.profGroupId = model.SplitstringintoArray(item.ProfessionGroupID);
                model.countryId = model.SplitstringintoArray(item.CountryID);
                model.stateId = model.SplitstringintoArray(item.StateID);
                model.regionId = model.SplitstringintoArray(item.regionId);
                model.branchId = model.SplitstringintoArray(item.branchid);
                model.dietId = item.DietID;
                model.kujadoshamId = item.KujaDoshamID;
                model.starLanguageId = item.StarLanguageID;
                model.starPreferenceId = item.TypeOfStar;
                model.lstPreferredStars = model.SplitstringintoArray(item.PreferredStars);
                model.Domicile = item.Domicel === 'India' ? 0 : (item.Domicel === 'abroad' ? 1 : (item.Domicel === 'All' ? 2 : ''));
            }
            commonFactory.open('partnerPrefContent.html', model.scope, uibModal);
        };
        model.partnerdescPopulate = function(item) {
            isSubmit = true;
            model.popupdata = model.aboutPartnerDescription;
            model.popupHeader = 'Partner Description';
            if (item !== undefined) {
                model.eventType = 'edit';
                model.partnerDescriptionId = item.PartnerDescripition;
            }
            commonFactory.open('partnerDescContent.html', model.scope, uibModal);
        };
        model.cancel = function() {
            commonFactory.closepopup();
        };
        model.partnerDescriptionSubmit = function(obj) {
            if (isSubmit) {
                isSubmit = false;
            }
        };
        model.updateData = function(inObj, type) {
            if (isSubmit) {
                isSubmit = false;
                switch (type) {
                    case 'Partnerprefernece details':
                        inObj.GetDetails.CustID = custID;
                        model.submitPromise = editPartnerpreferenceService.submitPartnerPrefData(inObj).then(function(response) {
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                editPartnerpreferenceService.getPartnerPreferenceData(custID).then(function(response) {
                                    model.partnerPrefArr = response.data;
                                });
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'PartnerPreference Details Submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'PartnerPreference Details Updation failed', 4500);
                            }
                        });
                        break;
                    case 'Partner Description':
                        model.submitPromise = editPartnerpreferenceService.submitPartnerDescData({ CustID: custID, AboutYourself: inObj.GetDetails.AboutYourself, flag: 1 }).then(function(response) {
                            commonFactory.closepopup();
                            if (response.data === '1') {
                                model.partnerDescription = inObj.GetDetails.AboutYourself;
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Partner Description Submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Partner Description Updation failed', 4500);
                            }
                        });
                        break;
                }
            }
        };
        model.partnerPreference = [
            { lblname: 'Gender', controlType: 'radio', ngmodel: 'genderId', arrbind: 'gender', parameterValue: 'GenderID' },
            { lblname: 'Age Gap', controlType: 'doublemultiselect', ngmodelSelect1: 'fromAgeId', ngmodelSelect2: 'toAgeId', typeofdata: 'ageBind', required: true, parameterValue1: 'AgeGapFrom', parameterValue2: 'AgeGapTo' },
            { lblname: 'Height', controlType: 'doublemultiselect', ngmodelSelect1: 'fromheightId', ngmodelSelect2: 'toheightId', required: true, typeofdata: 'heightregistration', parameterValue1: 'HeightFrom', parameterValue2: 'HeightTo' },
            { lblname: 'Religion', controlType: 'multiselect', ngmodel: 'religionId', typeofdata: 'Religion', required: true, secondParent: 'religionId', firstparent: 'mothertongueId', childName: 'caste', changeApi: 'castedependency', parameterValue: 'Religion' },
            { lblname: 'Mother tongue', controlType: 'multiselect', ngmodel: 'mothertongueId', typeofdata: 'Mothertongue', required: true, secondParent: 'religionId', firstparent: 'mothertongueId', childName: 'caste', changeApi: 'castedependency', parameterValue: 'Mothertongue' },
            { lblname: 'Caste', controlType: 'Changemultiselect', ngmodel: 'casteId', parentName: 'caste', required: true, childName: 'subCaste', changeApi: 'subCasteBind', parameterValue: 'Caste' },
            { lblname: 'Subcaste', controlType: 'Changemultiselect', ngmodel: 'subCasteId', typeofdata: 'Religion', parentName: 'subCaste', parameterValue: 'Subcaste' },
            { lblname: 'Marital status', controlType: 'multiselect', ngmodel: 'maritalstatusId', typeofdata: 'MaritalStatus', required: true, parameterValue: 'Maritalstatus' },
            { lblname: 'Education category', controlType: 'multiselect', ngmodel: 'eduCatgoryId', typeofdata: 'educationcategory', childName: 'educationgroup', changeApi: 'EducationGroup', parameterValue: 'Educationcategory' },
            { lblname: 'Education group', controlType: 'Changemultiselect', ngmodel: 'eduGroupId', typeofdata: 'Religion', parentName: 'educationgroup', parameterValue: 'Educationgroup' },
            { lblname: 'Employed in', controlType: 'multiselect', ngmodel: 'employedinId', typeofdata: 'ProfCatgory', parameterValue: 'Employedin' },
            { lblname: 'Profession group', controlType: 'multiselect', ngmodel: 'profGroupId', typeofdata: 'ProfGroup', parameterValue: 'Professiongroup' },
            { lblname: 'Domicile', controlType: 'radio', ngmodel: 'domicileId', arrbind: 'Domicile', parameterValue: 'Domacile' },
            { lblname: 'Preferred country', controlType: 'multiselect', ngmodel: 'countryId', typeofdata: 'Country', childName: 'state', changeApi: 'stateSelect', parameterValue: 'Preferredcountry' },
            { lblname: 'Preferred state', controlType: 'Changemultiselect', ngmodel: 'stateId', typeofdata: 'Religion', parentName: 'state', parameterValue: 'Preferredstate' },
            { lblname: 'Region', controlType: 'multiselect', ngmodel: 'regionId', typeofdata: 'region', childName: 'branch', changeApi: 'branch', parameterValue: 'Region' },
            { lblname: 'Branch', controlType: 'Changemultiselect', ngmodel: 'branchId', parentName: 'branch', parameterValue: 'Branch' },
            { lblname: 'Diet', controlType: 'radio', ngmodel: 'dietId', arrbind: 'Diet', parameterValue: 'Diet' },
            { lblname: 'Manglik/Kuja dosham', controlType: 'radio', ngmodel: 'kujadoshamId', arrbind: 'Kujadosham', parameterValue: 'ManglikKujadosham' },
            { lblname: 'Preferred star Language', controlType: 'radio', ngmodel: 'starLanguageId', arrbind: 'preferredStarlanguage', childName: 'star', changeApi: 'stars', parameterValue: 'PreferredstarLanguage' },
            { lblname: 'Star Preference', controlType: 'radio', ngmodel: 'starPreferenceId', arrbind: 'StarPreference', parameterValue: 'TypeofStar' },
            { lblname: '', controlType: 'Changemultiselect', ngmodel: 'lstPreferredStars', parentName: 'star', parameterValue: 'PrefredStars' },
            { lblname: '', controlType: 'break' }
        ];
        model.aboutPartnerDescription = [
            { lblname: '', controlType: 'about', required: true, ngmodel: 'partnerDescriptionId', parameterValue: 'AboutYourself' },
        ];
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('editPartnerpreferenceModel', factory);
    factory.$inject = ['editPartnerpreferenceService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];
})(angular);