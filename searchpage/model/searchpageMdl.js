(function(angular) {
    'use strict';

    function factory($http, searchpageServices, arrayConstants, SelectBindServiceApp, getArray, timeout, helpService, authSvc, alerts) {
        var model = {};
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.generalsearch = {};
        model.profileidupdate = function(obj) {
            searchpageServices.getPrimaryCustomerDataResponse(obj.ProfileIDpopup, model.empid).then(function(response) {
                console.log(response);
                if (response !== null && response.data !== undefined && response.data !== null && response.data !== "") {
                    var data = response.data;
                    model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.generalAgefrom = data.GenderID;
                    // model.generalsearch.generalAgeto = data.GenderID;
                    // model.generalsearch.generalheightfrom = data.GenderID;
                    // model.generalsearch.generalheightto = data.GenderID;
                    // model.generalsearch.Mothertongue = data.GenderID;
                    // model.generalsearch.Caste = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;
                    // model.generalsearch.gender = data.GenderID;

                }
                alerts.dynamicpopupclose();
            });
        };
        model.init = function() {
            model.maritalstatus = arrayConstants.MaritalStatus;
            model.Religion = arrayConstants.Religion;
            model.Mothertongue = arrayConstants.Mothertongue;
            model.visastatus = arrayConstants.visastatus;
            model.stars = arrayConstants.stars;
            model.Country = getArray.GArray('Country');
            model.Professiongroup = getArray.GArray('ProfGroup');
            model.educationcategory = arrayConstants.educationcategorywithoutselect;
            model.currency = getArray.GArray('currency');
            model.Complexion = arrayConstants.Complexion;
            model.Professionsearch = arrayConstants.Professionsearch;
            model.Regionofbranches = arrayConstants.Regionofbranches;
            model.starLanguage = arrayConstants.starLanguage;
            model.bodyType = arrayConstants.bodyType;
            model.PhysicalStatus = arrayConstants.PhysicalStatus;
            model.Membershiptype = arrayConstants.Membershiptype;
            model.ProfessionCategory = getArray.GArray('ProfCatgory');
            model.Showprofile = arrayConstants.Showprofile;
            model.BranchName = getArray.GArray('BranchName');
            model.Applicationstatus = getArray.GArray("Applicationstatus");
            model.Smoke = getArray.GArray("Smoke");
            model.Diet = getArray.GArray("Diet");
            model.selectedIndex = 0;
            model.activatedmobile = false;
            return model;
        };
        model.GetPhotoandHoroscopevalues = function(strType, str) {
            if (str !== null) {
                if (strType == "horo") {
                    str = ((str.indexOf("2") != -1) && (str.indexOf("3") != -1) ? null : (str.indexOf("2") != -1) ? "1" : (str.indexOf("3") != -1) ? "0" : null);
                } else {
                    str = ((str.indexOf("0") != -1) && (str.indexOf("1") != -1) ? null : (str.indexOf("1") != -1) ? "1" : (str.indexOf("0") != -1) ? "0" : null);
                }
            }
            return str;
        };
        model.submitgeneral = function(object) {
            console.log(object);
            model.searchobject = {
                CustID: 91022,
                GenderID: helpService.checkstringvalue(object.gender) ? object.gender : null,
                GenderText: null,
                AgeFromID: helpService.checkstringvalue(object.generalAgefrom) ? object.generalAgefrom : null,
                AgeFromText: null,
                AgeToID: helpService.checkstringvalue(object.generalAgeto) ? object.generalAgeto : null,
                AgeToText: null,
                HeightFromID: helpService.checkstringvalue(object.generalheightfrom) ? object.generalheightfrom : null,
                HeightFromText: null,
                HeightToID: helpService.checkstringvalue(object.generalheightto) ? object.generalheightto : null,
                HeightToText: null,
                MaritalstatusID: helpService.checkstringvalue(object.maritalstatus) ? object.maritalstatus : null,
                MaritalstatusText: null,
                ReligionID: helpService.checkstringvalue(object.Religion) ? object.Religion : null,
                ReligionText: null,
                MothertongueID: helpService.checkstringvalue(object.mothertongue) ? object.mothertongue : null,
                MothertongueText: null,
                castID: helpService.checkstringvalue(object.caste) ? object.caste : null,
                castIDText: null,
                CountryID: helpService.checkstringvalue(object.country) ? object.country : null,
                CountryText: null,
                EducationID: helpService.checkstringvalue(object.educationcategory) ? object.educationcategory : null,
                EducationText: null,
                ProfessionID: helpService.checkstringvalue(object.professiongeneral) ? object.professiongeneral : null,
                ProfessionText: null,
                Showinprofile: model.GetPhotoandHoroscopevalues("photo", object.Showprofile),
                ShowinprofileText: null,
                RegionID: helpService.checkstringvalue(object.Regionofbranches) ? object.Regionofbranches : null,
                RegionText: null,
                BranchID: helpService.checkstringvalue(object.branchre) ? object.branchre : null,
                BranchText: null,
                Dateofregfrom: helpService.checkstringvalue(object.dorfromreg) ? object.dorfromreg : null,
                Dateofregto: helpService.checkstringvalue(object.dortoreg) ? object.dortoreg : null,
                LastestLoginsfrom: helpService.checkstringvalue(object.lastloginfrom) ? object.lastloginfrom : null,
                LastestLoginsto: helpService.checkstringvalue(object.lastloginto) ? object.lastloginto : null,
                ApplicationstatusID: helpService.checkstringvalue(object.Applicationstatus) ? object.Applicationstatus : null,
                ApplicationstatusText: null,
                PropertyValuefrom: helpService.checkstringvalue(object.propertyfrom) ? object.propertyfrom : null,
                PropertyValueto: helpService.checkstringvalue(object.propertyto) ? object.propertyto : null,
                AnnualincomeID: helpService.checkstringvalue(object.generalcurrency) ? object.generalcurrency : null,
                AnnualincomeText: null,
                AnnualIncomefrom: helpService.checkstringvalue(object.fromsalary) ? object.fromsalary : null,
                AnnualIncometo: helpService.checkstringvalue(object.tosalary) ? object.tosalary : null,
                ProfileID: helpService.checkstringvalue(object.profileidgenearl) ? object.profileidgenearl : null,
                SeriousMatch: null,
                OnlyConfidential: object.showonlyconfidential === true ? 1 : 0,
                slidegride: null,
                HoroScopeStatus: model.GetPhotoandHoroscopevalues("horo", object.Showprofile),
            };
            searchpageServices.generalsearchsubmit(object).then(function(response) {
                console.log(response);
            });
        };

        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('searchpageModel', factory);
    factory.$inject = ['$http', 'searchpageServices', 'arrayConstants', 'SelectBindServiceApp',
        'getArray', '$timeout', 'helperservice', 'authSvc', 'alert',
    ];
})(angular);