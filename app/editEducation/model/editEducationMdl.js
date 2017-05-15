(function(angular) {
    'use strict';


    function factory($http, authSvc, editEducationService, commonFactory, uibModal, filter, alertss, stateParams, SelectBindService, arrayConstantsEdit) {
        var model = {};

        model.scope = {};
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = model.Admin = authSvc.isAdmin();
        model.Education = {};
        //start declaration block
        model.stateArr = [];
        model.districtArr = [];
        model.cityeArr = [];
        model.passOfyearArr = [];
        model.eduGroupArr = [];
        model.eduSpecialisationArr = [];
        model.ProfSpecialisationArr = [];
        model.ProfstateArr = [];
        model.ProfdistrictArr = [];
        model.ProfcityeArr = [];
        model.profObj = {};

        model.aboutObj = {};
        model.custObj = {};
        var isSubmit = true;
        model.educationID = 0;
        model.CustomerDataArr = [];
        model.reviewdisplay = 'Education details';
        model.eventType = 'add';
        //end declaration block

        var CustID = stateParams.CustID;

        model.init = function() {
            CustID = stateParams.CustID;
            model.CustID = CustID;
            model.getdata();
            return model;
        };

        model.getdata = function() {
            model.eduPageload();
            model.ProfPageload();
            model.aboutPageload();
            model.custdatapageload();
        };

        model.eduPageload = function() {

            editEducationService.getEducationData(CustID).then(function(response) {
                console.log(response.data);
                if (commonFactory.checkvals(response.data)) {
                    model.educationSelectArray = response.data;
                    model.eduEmpLastModificationDate = model.educationSelectArray.length > 0 ? model.educationSelectArray[0].EmpLastModificationDate : '';
                }

            });
        };
        model.ProfPageload = function() {

            editEducationService.getProfessionData(CustID).then(function(response) {
                if (commonFactory.checkvals(response.data)) {
                    model.ProfessionSelectArray = response.data;
                    model.profEmpLastModificationDate = model.ProfessionSelectArray ? model.ProfessionSelectArray[0].EmpLastModificationDate : '';
                }

            });

        };
        model.aboutPageload = function() {
            editEducationService.getAboutData(CustID).then(function(response) {
                if (commonFactory.checkvals(response.data)) {
                    var AboutData = (response.data).split(';');
                    model.lblaboutUrself = (AboutData[0].split(':'))[1];
                    model.AboutReviewStatusID = (AboutData[1].split(':'))[1];
                }
            });

        };
        model.custdatapageload = function() {
            editEducationService.getCustomerData(CustID).then(function(response) {
                model.CustomerDataArr = response.data !== undefined && response.data.length > 0 ? JSON.parse(response.data) : [];
                model.custEmpLastModificationDate = model.CustomerDataArr[0].EmpLastModificationDate;

            });
        };

        model.showpopup = function(type, item) {
            isSubmit = true;
            model.eventType = 'add';
            switch (type) {
                case 'showEduModal':

                    model.popupdata = model.Education;
                    model.popupHeader = 'Education Details';
                    model.EducationID = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.eduGroupArr = commonFactory.checkvals(item.EducationCategoryID) ? commonFactory.educationGroupBind(item.EducationCategoryID) : [];
                        model.eduSpecialisationArr = commonFactory.checkvals(item.EducationGroupID) ? commonFactory.educationSpeciakisationBind(item.EducationGroupID) : [];
                        model.IsHighestDegreeId = item.EduHighestDegree;
                        model.EduCatgoryId = commonFactory.checkvals(item.EducationCategoryID) ? parseInt(item.EducationCategoryID) : null;
                        model.EdugroupId = item.EducationGroupID;
                        model.EduspecializationId = item.EducationSpecializationID;
                        model.universityId = item.EduUniversity;
                        model.collegeId = item.EduCollege;
                        model.passOfyear = commonFactory.checkvals(item.EduPassOfYear) ? parseInt(item.EduPassOfYear) : null;
                        debugger;
                        model.countryId = item.CountryID;

                        model.stateId = item.StateID;
                        model.districtId = item.DistrictID;
                        model.cityId = item.CityID;
                        model.txtcity = "";
                        model.Edumerits = item.Educationdesc;
                        model.intCusID = item.intCusID;
                        model.EducationID = item.EducationID;
                    }

                    break;

                case 'showProfModal':
                    model.popupdata = model.profession;
                    model.popupHeader = 'Profession details';
                    model.Cust_Profession_ID = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.intCusID = item.intCusID;
                        model.EmployedInId = parseInt(item.ProfessionCategoryID);
                        model.ProfessionGroupId = item.ProfessionGroupID;
                        model.ProfessionId = item.ProfessionID;
                        model.CompanyName = item.CompanyName;
                        model.salary = item.Salary;
                        model.currency = item.SalaryCurrency;
                        model.profCountryId = item.CountryID;
                        model.profStateId = item.StateID;
                        model.profDistrictId = item.DistrictID;
                        model.profCityId = item.CityID;
                        // model.profTxtcity = item.CityWorkingIn;
                        debugger;
                        model.WorkingForm = commonFactory.convertDateFormat(item.WorkingFromDate, 'DD-MM-YYYY');
                        model.visaStatus = item.VisaTypeID;
                        model.sinceDate = commonFactory.convertDateFormat(item.ResidingSince, 'DD-MM-YYYY');
                        model.arrivalDate = commonFactory.convertDateFormat(item.ArrivingDate, 'DD-MM-YYYY');
                        model.departureDate = commonFactory.convertDateFormat(item.DepartureDate, 'DD-MM-YYYY');
                        model.occupationDetails = item.OccupationDetails;
                        model.Cust_Profession_ID = item.Cust_Profession_ID;
                    }

                    break;

                case 'showAboutModal':
                    model.popupdata = model.aboutUrSelf;
                    model.popupHeader = 'About your self';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.txtAboutUS = item;
                    }
                    break;

                case 'custData':

                    model.popupdata = model.Custdata;
                    model.popupHeader = 'Customer details';

                    if (item !== undefined) {

                        model.eventType = 'edit';
                        model.genderId = item.GenderID;
                        model.surName = item.LastName;
                        model.name = item.FirstName;
                        model.maritalStatusId = item.MaritalStatusID;
                        model.dob = commonFactory.convertDateFormat(item.DateofBirthwithoutAge, 'DD-MM-YYYY');
                        model.heightId = item.HeightID;
                        model.complexionId = item.ComplexionID;
                        model.religionId = item.ReligionID;
                        model.motherTongueId = item.MotherTongueID;
                        model.casteId = item.CasteID;
                        model.subcasteId = item.SubCasteID;
                        model.bornCitizenShipId = item.CitizenshipID;
                        model.physicalStausId = item.PhysicalStatusID;

                    }
                    break;
            }
            debugger;
            commonFactory.open('commonEduCatiobpopup.html', model.scope, uibModal);

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.updateData = function(inObj, type) {

            if (isSubmit) {
                isSubmit = false;
                switch (type) {
                    case 'Education Details':
                        inObj.customerEducation = {};
                        inObj.customerEducation = inObj.GetDetails;
                        inObj.customerEducation.Cust_Education_ID = model.EducationID;
                        inObj.customerEducation.intEduID = model.EducationID;
                        inObj.customerEducation.CustID = model.CustID;

                        model.submitPromise = editEducationService.submitEducationData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.eduPageload();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Education Details submitted Succesfully', 4500);
                                if (model.datagetInStatus === 1) {
                                    sessionStorage.removeItem('missingStatus');
                                    route.go('mobileverf', {});
                                }
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Education Details Updation failed', 4500);
                            }
                        });
                        break;
                    case 'Profession details':

                        inObj.customerProfession = {};
                        inObj.customerProfession = inObj.GetDetails;
                        inObj.customerProfession.profGridID = model.Cust_Profession_ID;
                        inObj.customerProfession.ProfessionID = model.Cust_Profession_ID;
                        inObj.customerProfession.CustID = CustID;
                        model.submitPromise = editEducationService.submitProfessionData(inObj).then(function(response) {
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.ProfPageload();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Professional Details  submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Professional Details  Updation failed', 4500);
                            }
                        });

                        break;
                    case 'Customer details':

                        inObj.GetDetails.CustID = CustID;
                        inObj.GetDetails.DateofBirth = inObj.GetDetails.DateofBirth !== '' && inObj.GetDetails.DateofBirth !== 'Invalid date' ? filter('date')(inObj.GetDetails.DateofBirth, 'MM/dd/yyyy hh:mm:ss a') : null,
                            editEducationService.submitCustomerData(inObj).then(function(response) {
                                console.log(response);
                                commonFactory.closepopup();
                                if (response.data === 1) {
                                    model.custdatapageload();
                                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Customer Personal Details submitted Succesfully', 4500);
                                } else {
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Customer Personal Details Updation failed', 4500);
                                }
                            });
                        break;

                    case 'About your self':

                        model.submitPromise = editEducationService.submitAboutUrData({ CustID: CustID, AboutYourself: inObj.GetDetails.txtAboutUS, flag: 1 }).then(function(response) {
                            commonFactory.closepopup();
                            if (response.data === '1') {
                                model.aboutPageload();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'About Yourself submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'About Yourself Updation failed', 4500);
                            }
                        });
                        break;
                }
            }
        };


        model.DeleteEduPopup = function(id) {
            model.educationID = id;
            commonFactory.open('deleteEduContent.html', model.scope, uibModal, 'sm');
        };

        model.deleteEduSubmit = function() {
            SelectBindService.DeleteSection({ sectioname: 'Education', CustID: CustID, identityid: model.educationID }).then(function(response) {
                console.log(response);
                model.eduPageload();
                commonFactory.closepopup();
            });
        };
        model.showHideVisastatus = function(item) {
            if (parseInt(model.profCountryId) === 1) {
                model.visaStatus = '';
                model.sinceDate = '';
                model.arrivalDate = '';
                model.departureDate = '';
                return false;
            }
            return true;
        };


        //performance code
        model.Education = [
            { lblname: 'Is Highest Degree', controlType: 'radio', ngmodel: 'IsHighestDegreeId', required: true, arrbind: 'boolType', parameterValue: 'Highestdegree' },
            { lblname: 'Education category', controlType: 'select', ngmodel: 'EduCatgoryId', required: true, typeofdata: 'educationcategory', parameterValue: 'Educationcategory', childName: 'EducationGroup', changeApi: 'EducationGroup' },
            { lblname: 'Education group', controlType: 'Changeselect', ngmodel: 'EdugroupId', required: true, parentName: 'EducationGroup', parameterValue: 'Educationgroup', changeApi: 'EducationSpecialisation', childName: 'EducationSpecialisation' },
            { lblname: 'Edu specialization', controlType: 'Changeselect', ngmodel: 'EduspecializationId', required: true, parentName: 'EducationSpecialisation', parameterValue: 'EducationSpecialization' },
            { lblname: 'University', controlType: 'textbox', ngmodel: 'universityId', parameterValue: 'University' },
            { lblname: 'College', controlType: 'textbox', ngmodel: 'collegeId', parameterValue: 'College' },
            { lblname: 'Pass of year', controlType: 'select', ngmodel: 'passOfyear', typeofdata: 'passOfYear', parameterValue: 'Passofyear' },
            {
                lblname: 'country',
                controlType: 'country',
                countryshow: true,
                cityshow: true,
                othercity: true,
                dcountry: 'countryId',
                dstate: 'stateId',
                ddistrict: 'districtId',
                dcity: 'cityId',
                strothercity: 'txtcity',
                countryParameterValue: 'Countrystudyin',
                stateParameterValue: 'Statestudyin',
                districtParameterValue: 'Districtstudyin',
                cityParameterValue: 'CitystudyIn',
                cityotherParameterValue: 'OtherCity'
            },
            {
                lblname: 'Educational merits',
                controlType: 'textarea',
                ngmodel: 'Edumerits',
                parameterValue: 'Educationalmerits'
            }

        ];

        model.profession = [
            { lblname: 'Employed In', controlType: 'select', ngmodel: 'EmployedInId', required: true, typeofdata: 'ProfCatgory', parameterValue: 'EmployedIn' },
            { lblname: 'Professional group', controlType: 'select', ngmodel: 'ProfessionGroupId', required: true, typeofdata: 'ProfGroup', parameterValue: 'Professionalgroup', childName: 'Profession', changeApi: 'ProfessionSpecialisation' },
            { lblname: 'Profession', controlType: 'Changeselect', ngmodel: 'ProfessionId', required: true, parentName: 'Profession', parameterValue: 'Profession' },
            { lblname: 'Company name', controlType: 'textbox', ngmodel: 'CompanyName', parameterValue: 'Companyname' },
            { lblname: 'Monthly salary', controlType: 'textboxSelect', ngmodelSelect: 'currency', ngmodelText: 'salary', typeofdata: 'currency', parameterValueSelect: 'Currency', parameterValueText: 'Monthlysalary' },
            {
                controlType: 'country',
                countryshow: true,
                cityshow: true,
                othercity: true,
                dcountry: 'profCountryId',
                dstate: 'profStateId',
                ddistrict: 'profDistrictId',
                dcity: 'profCityId',
                strothercity: 'profTxtcity',

                countryParameterValue: 'CountryID',
                stateParameterValue: 'StateID',
                districtParameterValue: 'DistrictID',
                cityParameterValue: 'CityID',
                cityotherParameterValue: 'OtherCity'
            },
            { lblname: 'Working from date', controlType: 'date', ngmodel: 'WorkingForm', parameterValueDate: 'Workingfromdate' },
            { lblname: 'visa status', controlType: 'select', ngmodel: 'visaStatus', typeofdata: 'visastatus', parameterValue: 'visastatus', parentDependecy: 'showHideVisastatus' },
            { lblname: 'Since date', controlType: 'date', ngmodel: 'sinceDate', parameterValueDate: 'Sincedate', parentDependecy: 'showHideVisastatus' },
            { lblname: 'Arrival Date', controlType: 'date', ngmodel: 'arrivalDate', parameterValueDate: 'ArrivalDate', parentDependecy: 'showHideVisastatus' },
            { lblname: 'Departure Date', controlType: 'date', ngmodel: 'departureDate', parameterValueDate: 'DepartureDate', parentDependecy: 'showHideVisastatus' },
            { lblname: 'Occupation Details', controlType: 'textarea', ngmodel: 'occupationDetails', parameterValue: 'OccupationDetails' }

        ];

        model.Custdata = [
            { lblname: 'Gender', controlType: 'radio', ngmodel: 'genderId', arrbind: 'gender', parameterValue: 'Gender' },
            { lblname: 'SurName', controlType: 'textbox', ngmodel: 'surName', required: true, parameterValue: 'LastName' },
            { lblname: 'Name', controlType: 'textbox', ngmodel: 'name', required: true, parameterValue: 'FirstName' },
            { lblname: 'Marital Status', controlType: 'select', ngmodel: 'maritalStatusId', required: true, typeofdata: 'MaritalStatus', parameterValue: 'MaritalStatusID' },
            { lblname: 'Date Of Birth', controlType: 'date', ngmodel: 'dob', required: true, parameterValueDate: 'DateofBirth' },
            { lblname: 'Height', controlType: 'select', ngmodel: 'heightId', required: true, typeofdata: 'heightregistration', parameterValue: 'HeightID' },
            { lblname: 'Complexion', controlType: 'select', ngmodel: 'complexionId', required: true, typeofdata: 'Complexion', parameterValue: 'ComplexionID' },
            { lblname: 'Religion', controlType: 'select', ngmodel: 'religionId', secondParent: 'motherTongueId', required: true, typeofdata: 'Religion', childName: 'caste', changeApi: 'castedependency', parameterValue: 'ReligionID' },
            { lblname: 'Mother Tongue', controlType: 'select', ngmodel: 'motherTongueId', secondParent: 'religionId', required: true, typeofdata: 'Mothertongue', childName: 'caste', changeApi: 'castedependency', parameterValue: 'MotherTongueID' },
            { lblname: 'Caste', controlType: 'Changeselect', ngmodel: 'casteId', required: true, parentName: 'caste', childName: 'subCaste', changeApi: 'subCasteBind', parameterValue: 'CasteID' },
            { lblname: 'SubCaste', controlType: 'Changeselect', ngmodel: 'subcasteId', parentName: 'subCaste', parameterValue: 'SubcasteID' },
            { lblname: 'Born Citizenship', controlType: 'select', ngmodel: 'bornCitizenShipId', required: true, typeofdata: 'Country', parameterValue: 'CitizenshipID' },
            { lblname: 'Physical Status', controlType: 'radio', ngmodel: 'physicalStausId', required: true, arrbind: 'PhysicalStatus', parameterValue: 'PhysicallyChallenged' }
        ];

        model.aboutUrSelf = [
            { lblname: '', controlType: 'about', maxlength: '1000', ngmodel: 'txtAboutUS', displayTxt: "(Please don't write phone numbers/emails/any junk characters)*", ngmodel: "aboutFamilyId", parameterValue: 'txtAboutUS' }
        ];


        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('editEducationModel', factory);

    factory.$inject = ['$http', 'authSvc', 'editEducationService', 'commonFactory', '$uibModal', '$filter', 'alert', '$stateParams', 'SelectBindService', 'arrayConstantsEdit'];

})(angular);