(function(angular) {
    'use strict';


    function factory(secondaryRegistrationService, getArray, commondependency, filter, timeout, stateParams, authSvc, $state, dynamicalert) {
        return function() {
            var model = {};
            model.scope = {};

            //start declaration

            model.MaritalStatus = getArray.GArray('MaritalStatus');
            model.Complexion = getArray.GArray('Complexion');
            model.PhysicalStatus = getArray.GArray('PhysicalStatus');
            model.height = getArray.GArray('heightregistration');
            model.educationcategory = getArray.GArray('educationcategory');
            model.visastatus = getArray.GArray('visastatus');
            model.regsec = {};
            model.noOfsibblingsArr = commondependency.numbersBind('', 0, 5);
            var countryID = stateParams.countryID;
            model.regsec.LabelName = stateParams.fn + ' ' + stateParams.ln;
            model.stateArr = commondependency.StateBind(stateParams.countryID);
            var custID = stateParams.CustID;
            model.profileid = stateParams.ProfileID;
            //end declaration

            model.init = function() {
                model.pageload();
                return model;
            };

            model.pageload = function() {
                model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";

                model.AdminID = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
                timeout(function() {
                    model.Country = _.isArray(model.Countrybind) && model.Countrybind.length > 0 ? model.Countrybind : getArray.GArray('Country');
                    model.countryCode = getArray.GArray('countryCode');
                    model.ProfCatgory = getArray.GArray('ProfCatgory');
                    model.ProfGroup = getArray.GArray('ProfGroup');
                    model.currency = getArray.GArray('currency');
                }, 2000);
                timeout(function() {
                    model.regsec.ddlCountryLivingIn = stateParams.countryID;
                }, 4000);
            };

            model.changeBind = function(type, paerntval, countryVal) {

                switch (type) {
                    case 'educat':
                        model.edugroup = commondependency.educationGroupBind(paerntval);
                        break;
                    case 'edugroup':
                        model.eduSplArr = commondependency.educationSpeciakisationBind(paerntval);
                        break;
                    case 'profGroup':
                        model.professionArr = commondependency.professionspecialisationBind(paerntval);
                        break;
                    case 'Country':
                        model.stateArr = commondependency.StateBind(paerntval);
                        break;
                    case 'state':
                        if (countryVal === '1' || countryVal === 1) {
                            model.districtArr = commondependency.districtBind(paerntval);
                        } else {
                            model.districtArr = [];
                            model.cityArr = [];
                            model.cityArr = commondependency.districtBind(paerntval);
                        }
                        break;
                    case 'district':
                        model.cityArr = commondependency.cityBind(paerntval);
                        break;

                }
            };

            model.secondRegSubmit = function(obj) {
                var regInput = {
                    GetDetails: {
                        NAME: obj.LabelName,
                        Maritalstatus: obj.rbtnmarital,
                        Heights: obj.ddlHeight,
                        Complexion: obj.rbtncomplexion,
                        Physicalstatus: obj.rbtnphysicalstatus,
                        Citizenship: obj.ddlBornCitizenship,
                        BornCitizenship: obj.ddlBornCitizenship,
                        EducationCategory: obj.ddlEduCategory,
                        EducationGroup: obj.ddlEduGroup,
                        EducationSpl: obj.ddlEduSpecialisation,
                        EducationDetails: obj.txtEducationMerits,
                        EmployeeIN: obj.ddlEmployedIn,
                        ProfessionGroup: obj.ddlProfessionalGroup,
                        Profession: obj.ddlProfession,
                        CompanyName: obj.txtCompanyName,
                        OccupationDetails: obj.txtOcccupationDetails,
                        AnnualIncome: 0,
                        Currency: obj.ddlcurrency,
                        Salary: obj.txtSalary,
                        CountryLivingIn: obj.ddlCountryLivingIn,
                        StateLivingIn: obj.ddlStatelivingIn,
                        DistictLivingIn: obj.ddlDistricLivingIn,
                        CityLivingIN: obj.ddlcityLivingIn,
                        Cityother: null,
                        VisaStatus: obj.ddlVisaStatus,
                        ResidingSince: obj.from !== '' ? filter('date')(obj.from, 'yyyy-MM-dd') : null,
                        FatherName: obj.txtFatherName,
                        FatherEducation: null,
                        FastherProfession: null,
                        FatherNative: obj.txtfathernative,
                        MotherName: obj.txtMotherName,
                        MotherEducation: null,
                        MotherProfession: null,
                        MotherNative: obj.txtmothernative,
                        NOofbrother: obj.ddlBrothers,
                        NOofSisters: obj.ddlSisters,
                        AboutYourself: obj.txtabouturself,
                        fathereducationdetails: obj.txtFatherEducation,
                        fatherProfessiondetails: obj.txtFatherProfession,
                        mothereducationdetails: obj.txtMotherEducation,
                        motherProfessiondetails: obj.txtMotherprofession,
                        FatherMobileCountryCode: obj.ddlFathermobilecountry !== '' && obj.ddlFathermobilecountry !== undefined ? obj.ddlFathermobilecountry : null,
                        FatherMobileNumber: obj.txtFatherMobileNo !== '' && obj.txtFatherMobileNo !== undefined ? obj.txtFatherMobileNo : null,
                        MotherMobileCountryCode: obj.ddlMothermobilecountry !== '' && obj.ddlMothermobilecountry !== undefined ? obj.ddlMothermobilecountry : null,
                        MotherMobileNumber: obj.txtMotherMobileNo !== "" && obj.txtMotherMobileNo !== undefined ? obj.txtMotherMobileNo : null,
                    },
                    customerpersonaldetails: {
                        intCusID: custID,
                        EmpID: model.empid,
                        Admin: model.AdminID
                    }
                };
                secondaryRegistrationService.submitSecodaryRegistration(regInput).then(function(res) {

                    $state.go('base.regManagePhoto', { CustID: stateParams.CustID, ProfileID: stateParams.ProfileID, genderID: stateParams.genderID });

                });
                //$state.go('reg.regManagePhoto', { CustID: stateParams.CustID, genderID: stateParams.genderID });

            };


            model.mobilevalueExists = function(type, flag, val) {
                if (val !== undefined) {
                    secondaryRegistrationService.emailExists({ iflagEmailmobile: flag, EmailMobile: val }).then(function(response) {
                        if (response.data === 1) {
                            if (type === 'father') {
                                model.regsec.txtFatherMobileNo = '';
                            } else {
                                model.regsec.txtMotherMobileNo = '';
                            }
                            dynamicalert.timeoutoldalerts(model.scope, 'alert-danger', 'Mobile number Already Exists', 9500);
                        }
                    });
                }
            };

            return model.init();
        };
    }
    angular
        .module('Kaakateeya')
        .factory('secondaryRegistrationModel', factory);

    factory.$inject = ['secondaryRegistrationService', 'getArray', 'Commondependency', '$filter', '$timeout', '$stateParams', 'authSvc', '$state', 'alert'];

})(angular);