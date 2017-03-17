(function(angular) {
    'use strict';

    function factory($http, searchpageServices, arrayConstants, SelectBindServiceApp, getArray, timeout,
        helpService, authSvc, alerts, Commondependency, filter) {
        var model = {};
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
        model.generalsearch = {};
        model.advancedsearch = {};
        model.advancedsearch.typeofsearch = 2;
        model.generalsearch.typrofsearch = 2;
        model.CgetDetails = {};
        model.getpageloadobject = {};
        model.Relationships = [];
        model.slideshowarray = [];
        model.slideshowtrue = false;
        model.divcontrolls = true;
        model.Cust_ID = null;
        model.selectedIndex = 0;
        model.activatedmobile = true;
        model.searchpopuptext = "General Search";
        model.divcontrollsbind = 0;
        model.returnnullvalue = function(value) {
            var obj = helpService.checkstringvalue(value) && (value.toString()) !== "0" && (value.toString()) !== 0 ? (value.toString()) : null;
            return obj;
        };
        model.arrayToString = function(string) {
            return string !== null ? (string.split(',')).map(Number) : null;
        };

        model.profileidupdate = function(obj) {
            debugger;
            if (model.divcontrollsbind === 0) {
                model.init();
            }
            searchpageServices.getPrimaryCustomerDataResponse(obj.ProfileIDpopup, model.empid).then(function(response) {
                console.log(response);
                if (response !== null && response.data !== undefined && response.data !== null && response.data !== "") {
                    var data = model.getpageloadobject = response.data;
                    model.Cust_ID = data.Cust_ID;
                    model.generalsearch.gender = data.GenderID;
                    model.generalsearch.generalAgefrom = data.AgeMin;
                    model.generalsearch.generalAgeto = data.AgeMax;
                    model.generalsearch.generalheightfrom = data.MinHeight;
                    model.generalsearch.generalheightto = data.MaxHeight;
                    model.generalsearch.maritalstatus = model.arrayToString(data.maritalstatusid);
                    model.generalsearch.Religion = model.arrayToString(data.religionid);
                    model.generalsearch.mothertongue = model.arrayToString(data.MotherTongueID);
                    model.Caste = Commondependency.casteDepedency(model.generalsearch.Religion, model.generalsearch.mothertongue);
                    model.generalsearch.caste = model.arrayToString(data.casteid);
                    model.generalsearch.country = model.arrayToString(data.CountryID);
                    model.generalsearch.educationcategory = model.arrayToString(data.EducationCategoryID);
                    model.generalsearch.Regionofbranches = model.arrayToString(data.Regions);
                    model.generalsearch.branchre = model.arrayToString(data.Branches);
                    model.advancedsearch.gender = data.GenderID;
                    model.advancedsearch.advancedage = data.AgeMin;
                    model.advancedsearch.advancedageto = data.AgeMax;
                    model.advancedsearch.advancedheightfrom = data.MinHeight;
                    model.advancedsearch.advancedheightto = data.MaxHeight;
                    model.advancedsearch.advancedmaritalstatus = model.arrayToString(data.maritalstatusid);
                    model.advancedsearch.advancedReligion = model.arrayToString(data.religionid);
                    model.advancedsearch.advancedmothertongue = model.arrayToString(data.MotherTongueID);
                    model.Caste = Commondependency.casteDepedency(model.advancedsearch.advancedReligion, model.advancedsearch.advancedmothertongue);
                    model.advancedsearch.advancedcaste = model.arrayToString(data.casteid);
                    model.advancedsearch.Complexion = model.arrayToString(data.complexionid);
                    model.advancedsearch.advanededucationcategory = model.arrayToString(data.EducationCategoryID);
                    model.Educationgroup = Commondependency.educationGroupBind((model.advancedsearch.advanededucationcategory !== undefined && model.advancedsearch.advanededucationcategory !== null && model.advancedsearch.advanededucationcategory !== "") ? (model.advancedsearch.advanededucationcategory).toString() : "");
                    model.advancedsearch.Educationadvance = model.arrayToString(data.EducationGroupID);
                    model.educationspeciallisation = Commondependency.educationSpeciakisationBind((model.advancedsearch.Educationadvance !== undefined && model.advancedsearch.Educationadvance !== null && model.advancedsearch.Educationadvance !== "") ? (model.advancedsearch.Educationadvance).toString() : "");
                    model.advancedsearch.advancedProfessiongroup = model.arrayToString(data.ProfessionGroup);
                    model.advancedsearch.country = model.arrayToString(data.CountryID);
                    model.State = Commondependency.StateBind((data.CountryID !== undefined && data.CountryID !== null && data.CountryID !== "") ? (data.CountryID).toString() : "");
                    model.advancedsearch.stateadvance = model.arrayToString(data.StateID);
                    model.DistrictBind = Commondependency.districtBind((data.StateID !== undefined && data.StateID !== null && data.StateID !== "") ? (data.StateID).toString() : "");
                    model.advancedsearch.districtadvance = model.arrayToString(data.DistrictID);
                    model.advancedsearch.advancedstarLanguage = model.arrayToString(data.StarLanguageID);
                    model.advancedsearch.advancedstars = model.arrayToString(data.PreferredStars);
                    model.advancedsearch.kujadosam = data.KujaDosham;
                    model.advancedsearch.Regionofbranchesadvanced = model.arrayToString(data.Regions);
                    model.advancedsearch.branchre = model.arrayToString(data.Branches);
                    model.advancedsearch.Diet = model.arrayToString(data.Diet);
                    model.advancedsearch.Smoke = model.arrayToString(data.Smoke);
                    model.advancedsearch.Drink = model.arrayToString(data.Drink);
                    model.advancedsearch.advancedbodyType = model.arrayToString(data.BodyTypeID);
                    model.advancedsearch.advancedPhysicalStatus = model.arrayToString(data.physicalstatusid);

                }
                alerts.dynamicpopupclose();
            });
        };
        model.init = function() {
            model.divcontrollsbind = 1;
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

        };
        model.GetPhotoandHoroscopevalues = function(strType, str) {
            if (str !== null && str !== undefined && str !== "") {
                if (strType == "horo") {
                    str = ((str.indexOf("2") != -1) && (str.indexOf("3") != -1) ? null : (str.indexOf("2") != -1) ? "1" : (str.indexOf("3") != -1) ? "0" : null);
                } else {
                    str = ((str.indexOf("0") != -1) && (str.indexOf("1") != -1) ? null : (str.indexOf("1") != -1) ? "1" : (str.indexOf("0") != -1) ? "0" : null);
                }
            }
            return str;
        };
        model.submitgeneral = function(object, frompage, topage) {
            console.log(object);
            if (parseInt(frompage) === 1) {
                model.CgetDetails.GetDetails = {
                    CustID: model.Cust_ID,
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
                    MaritalstatusID: model.returnnullvalue(object.maritalstatus),
                    MaritalstatusText: null,
                    ReligionID: model.returnnullvalue(object.Religion),
                    ReligionText: null,
                    MothertongueID: model.returnnullvalue(object.mothertongue),
                    MothertongueText: null,
                    castID: model.returnnullvalue(object.caste),
                    castIDText: null,
                    CountryID: model.returnnullvalue(object.country),
                    CountryText: null,
                    EducationID: model.returnnullvalue(object.educationcategory),
                    EducationText: null,
                    ProfessionID: model.returnnullvalue(object.professiongeneral),
                    ProfessionText: null,
                    Showinprofile: model.GetPhotoandHoroscopevalues("photo", object.Showprofile),
                    ShowinprofileText: null,
                    RegionID: model.returnnullvalue(object.Regionofbranches),
                    RegionText: null,
                    BranchID: model.returnnullvalue(object.branchre),
                    BranchText: null,
                    Dateofregfrom: helpService.checkstringvalue(object.dorfromreg) ? filter('date')(object.dorfromreg, 'MM/dd/yyyy') : null,
                    Dateofregto: helpService.checkstringvalue(object.dortoreg) ? filter('date')(object.dortoreg, 'MM/dd/yyyy') : null,
                    LastestLoginsfrom: helpService.checkstringvalue(object.lastloginfrom) ? filter('date')(object.lastloginfrom, 'MM/dd/yyyy') : null,
                    LastestLoginsto: helpService.checkstringvalue(object.lastloginto) ? filter('date')(object.lastloginto, 'MM/dd/yyyy') : null,
                    ApplicationstatusID: model.returnnullvalue(object.Applicationstatus),
                    ApplicationstatusText: null,
                    PropertyValuefrom: helpService.checkstringvalue(object.propertyfrom) ? object.propertyfrom : null,
                    PropertyValueto: helpService.checkstringvalue(object.propertyto) ? object.propertyto : null,
                    AnnualincomeID: model.returnnullvalue(object.generalcurrency),
                    AnnualincomeText: null,
                    AnnualIncomefrom: helpService.checkstringvalue(object.fromsalary) ? object.fromsalary : null,
                    AnnualIncometo: helpService.checkstringvalue(object.tosalary) ? object.tosalary : null,
                    ProfileID: helpService.checkstringvalue(object.profileidgenearl) ? object.profileidgenearl : null,
                    SeriousMatch: null,
                    OnlyConfidential: object.showonlyconfidential === true ? 1 : 0,
                    slidegride: null,
                    HoroScopeStatus: model.GetPhotoandHoroscopevalues("horo", object.Showprofile)
                };
            }
            model.CgetDetails = {
                GetDetails: model.CgetDetails.GetDetails,
                customerpersonaldetails: {
                    CustID: helpService.checkstringvalue(model.getpageloadobject.Cust_ID) ? model.getpageloadobject.Cust_ID : null,
                    EmpID: model.empid,
                    Admin: model.isAdmin,
                    startindex: frompage,
                    EndIndex: topage
                }
            };
            searchpageServices.generalsearchsubmit(model.CgetDetails).then(function(response) {
                console.log(response);
                if (parseInt(frompage) === 1) {
                    model.slideshowarray = [];
                    _.each(response.data, function(item) {
                        model.slideshowarray.push(item);
                    });
                } else {
                    _.each(model.data, function(item) {
                        model.slideshowarray.push(item);
                    });
                }
                model.scope.$broadcast("generalsearchslide", model.slideshowarray, "general", model.getpageloadobject, frompage);
                model.divcontrolls = false;
                model.slideshowtrue = true;
            });
        };
        model.closepopup = function() {
            debugger;
            if (model.divcontrollsbind === 0) {
                model.init();
            }
            alerts.dynamicpopupclose();
        };
        model.submitadvancedsearch = function(object, frompage, topage) {
            console.log(object);
            if (parseInt(frompage) === 1) {
                model.CgetDetails.GetDetails = {
                    CustID: model.Cust_ID,
                    GenderID: helpService.checkstringvalue(object.gender) ? object.gender : null,
                    GenderText: null,
                    AgeFromID: helpService.checkstringvalue(object.advancedage) ? object.advancedage : null,
                    AgeFromText: null,
                    AgeToID: helpService.checkstringvalue(object.advancedageto) ? object.advancedageto : null,
                    AgeToText: null,
                    HeightFromID: helpService.checkstringvalue(object.advancedheightfrom) ? object.advancedheightfrom : null,
                    HeightFromText: null,
                    HeightToID: helpService.checkstringvalue(object.advancedheightto) ? object.advancedheightto : null,
                    HeightToText: null,
                    MaritalstatusID: model.returnnullvalue(object.advancedmaritalstatus),
                    MaritalstatusText: null,
                    ReligionID: model.returnnullvalue(object.advancedReligion),
                    ReligionText: null,
                    MothertongueID: model.returnnullvalue(object.advancedmothertongue),
                    MothertongueText: null,
                    castID: model.returnnullvalue(object.advancedcaste),
                    castIDText: null,
                    CountryID: null,
                    CountryText: null,
                    EducationID: null,
                    EducationText: null,
                    ProfessionID: model.returnnullvalue(object.professionBind),
                    ProfessionText: null,
                    Showinprofile: model.GetPhotoandHoroscopevalues("photo", object.Showprofileadvanced),
                    ShowinprofileText: null,
                    RegionID: model.returnnullvalue(object.Regionofbranchesadvanced),
                    RegionText: null,
                    BranchID: model.returnnullvalue(object.branchre),
                    BranchText: null,
                    Dateofregfrom: helpService.checkstringvalue(object.dateofregfrom) ? object.dateofregfrom : null,
                    Dateofregto: helpService.checkstringvalue(object.dateofregto) ? object.dateofregto : null,
                    LastestLoginsfrom: helpService.checkstringvalue(object.latestloginfrom) ? object.latestloginfrom : null,
                    LastestLoginsto: helpService.checkstringvalue(object.latestloginto) ? object.latestloginto : null,
                    ApplicationstatusID: model.returnnullvalue(object.Applicationstatus),
                    ApplicationstatusText: null,
                    PropertyValuefrom: helpService.checkstringvalue(object.propertyfrom) ? object.propertyfrom : null,
                    PropertyValueto: helpService.checkstringvalue(object.propertyto) ? object.propertyto : null,
                    AnnualincomeID: model.returnnullvalue(object.advancedcurrency),
                    AnnualincomeText: null,
                    AnnualIncomefrom: helpService.checkstringvalue(object.fromcurrency) ? object.fromcurrency : null,
                    AnnualIncometo: helpService.checkstringvalue(object.tocurrency) ? object.tocurrency : null,
                    ProfileID: helpService.checkstringvalue(object.profileid) ? object.profileid : null,
                    SeriousMatch: null,
                    OnlyConfidential: object.showonlyconfidential === true ? 1 : 0,
                    slidegride: null,
                    ComplexionID: model.returnnullvalue(object.Complexion),
                    ComplexionText: null,
                    bodytypeID: model.returnnullvalue(object.advancedbodyType),
                    bodytypeText: null,
                    physicalStatusID: model.returnnullvalue(object.advancedPhysicalStatus),
                    physicalStatusText: null,
                    EducationCategoryID: model.returnnullvalue(object.advanededucationcategory),
                    EducationCategoryText: null,
                    EducationGroupID: model.returnnullvalue(object.Educationadvance),
                    EducationGroupText: null,
                    EducationSpecializationID: model.returnnullvalue(object.educationspeciallisation),
                    EducationSpecializationText: null,
                    University: helpService.checkstringvalue(object.University) ? object.University : null,
                    ProfessionAreaID: model.returnnullvalue(object.advancedProfessiongroup),
                    ProfessionAreaText: null,
                    jobCountryID: model.returnnullvalue(object.country),
                    jobCountryText: null,
                    StateID: model.returnnullvalue(object.stateadvance),
                    StateText: null,
                    DistrictID: model.returnnullvalue(object.districtadvance),
                    DistrictText: null,
                    CityID: model.returnnullvalue(object.cityBindadvance),
                    CityText: null,
                    VisaStatusID: model.returnnullvalue(object.visastatus),
                    VisaStatusText: null,
                    Arrivaldateto: helpService.checkstringvalue(object.arrvingdateto) ? object.arrvingdateto : null,
                    Departuredatefrom: helpService.checkstringvalue(object.departuredatefrom) ? object.departuredatefrom : null,
                    DeparturedateTo: helpService.checkstringvalue(object.departuredateto) ? object.departuredateto : null,
                    StarLanguageID: model.returnnullvalue(object.advancedstarLanguage),
                    StarLanguageText: null,
                    StarsID: model.returnnullvalue(object.advancedstars),
                    StarsText: null,
                    KojadoshamID: helpService.checkstringvalue(object.kujadosam) ? object.kujadosam : null,
                    KojadoshamText: null,
                    DrinkID: model.returnnullvalue(object.Drink),
                    DrinkText: null,
                    SmokeID: model.returnnullvalue(object.Smoke),
                    SmokeText: null,
                    DietID: model.returnnullvalue(object.Diet),
                    DietText: null,
                    preferedCityID: model.returnnullvalue(object.Preferredcity),
                    preferedCityText: null,
                    MembershipTypeID: model.returnnullvalue(object.Membershiptypeadvanced),
                    MembershipTypeText: null,
                    WorkingwithID: model.returnnullvalue(object.ProfessionCategory),
                    WorkingwithText: null,
                    CompanyName: helpService.checkstringvalue(object.companyname) ? object.companyname : null,
                    Residingsincefrom: helpService.checkstringvalue(object.residingsincefrom) ? object.residingsincefrom : null,
                    ResidingsinceTo: helpService.checkstringvalue(object.residingto) ? object.residingto : null,
                    Arrivaldatefrom: helpService.checkstringvalue(object.arrivingdatefrom) ? object.arrivingdatefrom : null,
                    FirstName: helpService.checkstringvalue(object.firstname) ? object.firstname : null,
                    LastName: helpService.checkstringvalue(object.lastname) ? object.lastname : null,
                    PreferedCountryID: model.returnnullvalue(object.advancedcountrygeneralpref),
                    PreferedCountryText: null,
                    PreferedStateID: model.returnnullvalue(object.advancedstatelivingpref),
                    PreferedStateText: null,
                    preferedDistrictID: model.returnnullvalue(object.districtadvancepref),
                    preferedDistrictText: null,
                    HoroScopeStatus: model.GetPhotoandHoroscopevalues("horo", object.Showprofileadvanced),
                    Status_Photo: helpService.checkstringvalue(object.photograde) ? object.photograde : null,
                    Status_Education: helpService.checkstringvalue(object.Educationgrade) ? object.Educationgrade : null,
                    Status_Property: helpService.checkstringvalue(object.Propertygrade) ? object.Propertygrade : null,
                    Status_Family: helpService.checkstringvalue(object.Familygrade) ? object.Familygrade : null,
                    Status_Profession: helpService.checkstringvalue(object.Professiongrade) ? object.Professiongrade : null
                };
            }
            model.CgetDetails = {
                GetDetails: model.CgetDetails.GetDetails,
                customerpersonaldetails: {
                    CustID: helpService.checkstringvalue(model.getpageloadobject.Cust_ID) ? model.getpageloadobject.Cust_ID : null,
                    EmpID: model.empid,
                    Admin: model.isAdmin,
                    startindex: frompage,
                    EndIndex: topage
                }
            };
            searchpageServices.advancedsearchsubmit(model.CgetDetails).then(function(response) {
                console.log(response);
                if (parseInt(frompage) === 1) {
                    model.slideshowarray = [];
                    _.each(response.data, function(item) {
                        model.slideshowarray.push(item);
                    });
                } else {
                    _.each(model.data, function(item) {
                        model.slideshowarray.push(item);
                    });
                }
                model.scope.$broadcast("generalsearchslide", model.slideshowarray, "advanced", model.getpageloadobject, frompage);
                model.divcontrolls = false;
                model.slideshowtrue = true;
            });

        };
        model.getrelationshipstypes = function(flag, profileid, about) {
            searchpageServices.getrelationships(flag, profileid, "").then(function(response) {
                console.log(response);
                _.each(response.data, function(item) {
                    model.Relationships = JSON.parse(item);
                    console.log(model.Relationships);
                });
            });

        };

        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('searchpageModel', factory);
    factory.$inject = ['$http', 'searchpageServices', 'arrayConstants', 'SelectBindServiceApp',
        'getArray', '$timeout', 'helperservice', 'authSvc', 'alert', 'Commondependency', '$filter'
    ];
})(angular);