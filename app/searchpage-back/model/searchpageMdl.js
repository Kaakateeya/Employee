(function(angular) {
    'use strict';

    function factory($http, searchpageServices, arrayConstants, SelectBindServiceApp, getArray, timeout,
        helpService, authSvc, alerts, Commondependency, filter, modelpopupopenmethod, config, $sce,
        expressInterestModel) {
        var model = {};
        model = config;
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
        model.searchpopuptext = "General Search";
        model.Relationshipname = "";
        model.relationshippopup = null;
        model.typrofsearch = "2";
        model.sidebarnavshow = true;
        model.mySidenavdiv = false;
        model.mystylenamediv = true;
        model.headervisileble = false;
        model.dynamicFunction = '';
        model.slidephotos = [];
        model.divmismatchData = [];
        model.templateUrl = "templates/angularSlide.html";
        model.headettemp = "templates/angularHeader.html";
        model.tickethistory = "templates/ticketHistoryPopup.html";
        model.selectedIndex = 0;
        model.tabsshowhidecontrols = true;
        model.shortlistmodel = {};
        model.returnnullvalue = function(value) {
            var obj = helpService.checkstringvalue(value) && (value.toString()) !== "0" && (value.toString()) !== 0 ? (value.toString()) : null;
            return obj;
        };
        model.arrayToString = function(string) {

            return string !== null && string !== "" ? (string.split(',')).map(Number) : null;
        };
        model.profileidupdate = function(obj) {
            if (model.divcontrollsbind === 0) {
                model.init();
            }
            model.sidebarnavshow = false;
            searchpageServices.getPrimaryCustomerDataResponse(obj.ProfileIDpopup, model.empid).then(function(response) {
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
                    model.Caste = [];
                    model.Caste = Commondependency.casteDepedency(model.generalsearch.Religion, model.generalsearch.mothertongue);
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
                    model.generalsearch.Showprofile = model.arrayToString("1");
                    model.generalsearch.Applicationstatusidgeneral = model.arrayToString("54");
                    model.advancedsearch.Applicationstatusidadvanced = model.arrayToString("54");
                    model.advancedsearch.Showprofileadvanced = model.arrayToString("1");
                    //
                    timeout(function() {
                        model.generalsearch.caste = model.arrayToString(data.casteid);
                        model.advancedsearch.advancedcaste = model.arrayToString(data.casteid);
                    }, 100);

                }
                alerts.dynamicpopupclose();
            });
        };
        model.removeSelect = function(Arr) {
            if (Arr.length > 0 && angular.lowercase(Arr[0].title) === '--select--') {
                Arr.splice(0, 1);
            }
            return Arr;
        };
        model.init = function() {
            model.photogradearray = [{ value: 216, name: 'A' },
                { value: 217, name: 'B' },
                { value: 218, name: 'C' },
                { value: 219, name: 'D' }
            ];
            model.divcontrollsbind = 1;
            model.maritalstatus = model.removeSelect(arrayConstants.MaritalStatus);
            model.Religion = model.removeSelect(arrayConstants.Religion);
            model.Mothertongue = model.removeSelect(arrayConstants.Mothertongue);
            model.visastatus = model.removeSelect(arrayConstants.visastatus);
            model.stars = model.removeSelect(arrayConstants.stars);
            model.Country = getArray.GArray('Country');
            model.Professiongroup = getArray.GArray('ProfGroup');
            // model.educationcategory = model.removeSelect(arrayConstants.educationcategorywithoutselect);
            model.currency = getArray.GArray('currency');
            model.Complexion = model.removeSelect(arrayConstants.Complexion);
            model.Professionsearch = model.removeSelect(arrayConstants.Professionsearch);
            model.Regionofbranches = model.removeSelect(arrayConstants.Regionofbranches);
            model.starLanguage = model.removeSelect(arrayConstants.starLanguage);
            model.bodyType = model.removeSelect(arrayConstants.bodyType);
            model.PhysicalStatus = model.removeSelect(arrayConstants.PhysicalStatus);
            model.Membershiptype = model.removeSelect(arrayConstants.Membershiptype);
            model.ProfessionCategory = getArray.GArray('ProfCatgory');
            model.Showprofile = model.removeSelect(arrayConstants.Showprofile);
            model.BranchName = getArray.GArray('BranchName');
            model.Applicationstatus = getArray.GArray("Applicationstatus");
            model.Smoke = getArray.GArray("Smoke");
            model.Diet = getArray.GArray("Diet");
            model.generalsearch.Showprofile = model.arrayToString("1");
            model.generalsearch.Applicationstatusidgeneral = model.arrayToString("54");
            model.generalsearch.mothertongue = model.arrayToString("1");
            model.generalsearch.Religion = model.arrayToString("1");
            model.advancedsearch.Applicationstatusidadvanced = model.arrayToString("54");
            model.advancedsearch.Showprofileadvanced = model.arrayToString("1");
            model.advancedsearch.advancedmothertongue = model.arrayToString("1");
            model.advancedsearch.advancedReligion = model.arrayToString("1");
            model.generalsearch.country = model.arrayToString("1");
            model.Caste = Commondependency.casteDepedency(model.generalsearch.Religion, model.generalsearch.mothertongue);

            _.each(model.dom, function(parentItem) {
                _.each(parentItem.controlList, function(item) {
                    if (item.dataBind) {
                        model[item.dataSource] = model.removeSelect(arrayConstants[item.dataBind]);
                    } else if (item.dataApi) {
                        model[item.dataSource] = getArray.GArray(item.dataBind);
                    }
                });

            });
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
            model.topage = topage;
            if (parseInt(frompage) === 1) {
                model.slides = [];
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
                    ApplicationstatusID: model.returnnullvalue(object.Applicationstatusidgeneral),
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
                console.log(response.data);
                model.isshortlistprogressbar = true;
                model.slideshowarray = [];
                _.each(response.data, function(item) {
                    model.slideshowarray.push(item);
                });
                if (model.typrofsearch === "2") {
                    model.headervisileble = true;
                    model.tablename = "general";
                    if (parseInt(frompage) === 1) {
                        model.divcontrolls = false;
                        model.slideshowtrue = true;
                        model.setSlides(model.slideshowarray, parseInt(topage));
                        model.totalRecords = parseInt(frompage) === 1 && response !== undefined && response.data !== undefined && model.slideshowarray.length > 0 ? model.slideshowarray[0].TotalRows : 0;
                    } else {
                        model.addSlides(model.slideshowarray, model.slides, parseInt(topage));
                    }

                } else {

                    model.scope.$broadcast('submittablesearch', model.slideshowarray, frompage);
                }
            });
        };
        model.closepopup = function() {
            //if (model.divcontrollsbind === 0) {
            model.init();
            //  }
            model.sidebarnavshow = true;
            alerts.dynamicpopupclose();
        };
        model.submitadvancedsearch = function(object, frompage, topage) {
            var paramters = {};
            _.each(model.dom, function(parentItem) {
                _.each(parentItem.controlList, function(item) {
                    paramters[item.ngModel] = model[item.ngModel];
                });
            });
            model.topage = topage;
            if (parseInt(frompage) === 1) {
                model.slides = [];
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
                    ApplicationstatusID: model.returnnullvalue(object.Applicationstatusidadvanced),
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
                    Status_Photo: model.returnnullvalue(object.photograde),
                    Status_Education: model.returnnullvalue(object.Educationgrade),
                    Status_Property: model.returnnullvalue(object.Propertygrade),
                    Status_Family: model.returnnullvalue(object.Familygrade),
                    Status_Profession: model.returnnullvalue(object.Professiongrade)
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
                model.isshortlistprogressbar = true;
                model.slideshowarray = [];
                _.each(response.data, function(item) {
                    model.slideshowarray.push(item);
                });

                if (model.typrofsearch === "2") {
                    model.tablename = "advanced";
                    if (parseInt(frompage) === 1) {
                        model.totalRecords = parseInt(frompage) === 1 && response !== undefined && response.data !== undefined && model.slideshowarray.length > 0 ? model.slideshowarray[0].TotalRows : 0;
                        model.setSlides(model.slideshowarray, parseInt(topage));
                    } else {
                        model.addSlides(model.slideshowarray, model.slides, parseInt(topage));
                    }
                } else {
                    model.scope.$broadcast('submittablesearch', model.slideshowarray, frompage);
                }
                model.divcontrolls = false;
                model.slideshowtrue = true;
            });

        };
        model.getrelationshipstypes = function(flag, profileid, about) {
            searchpageServices.getrelationships(flag, profileid, "").then(function(response) {
                _.each(response.data, function(item) {
                    model.Relationships = JSON.parse(item);
                });
            });

        };
        model.relationshipbind = function(flag, profileid, about) {
            searchpageServices.getrelationships(flag, profileid, about).then(function(response) {
                model.popupFirstName = "";
                model.popupLastName = "";
                if (response !== null && response.data !== undefined && response.data !== null && response.data !== "") {
                    var Relationships = JSON.parse(response.data);
                    model.popupFirstName = Relationships[0].FirstName;
                    model.popupLastName = Relationships[0].LastName;
                }
            });
        };
        model.showdivsidenav = function(flag) {
            switch (flag) {
                case "mySidenav":
                    model.mySidenavdiv = true;
                    model.mystylenamediv = false;
                    break;
                case "mystylename":
                    model.mySidenavdiv = false;
                    model.mystylenamediv = true;
                    break;
            }
        };
        model.applycolors = function(value, id) {
            alerts.applycolors(value, id);
        };

        model.applycolorsfortextboxes = function(value, id) {
            alerts.applycolorsfortextboxes(value, id);
        };

        model.applycolorsfortextboxesdate = function(value, id) {
            alerts.applycolorsfortextboxesdate(value, id);
        };
        model.closeupload = function(type) {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        model.close = function(type) {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        model.getClickedCustID = function(slide) {
            if (model.dynamicFunction === "getClickedCustID" || model.dynamicFunction === "mismatchProfileCheck") {
                model.close();
            }
            slide.isShortlisted = true;
            alerts.timeoutoldalerts(model.scope, 'alert-success', 'profile has been shortlisted successfully', 2000);
        };
        model.mismatchProfileCheck = function(slide) {
            if (model.dynamicFunction === "getClickedCustID" || model.dynamicFunction === "mismatchProfileCheck") {
                model.close();
            }
            if (slide.isShortlisted) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profile already shortlisted', 2000);
            } else {
                model.divmismatchData = [];
                var strmismatch = '';
                if (parseInt(slide.Age) < parseInt(model.getpageloadobject.AgeMin) && parseInt(slide.Age) > parseInt(model.getpageloadobject.AgeMax)) {
                    strmismatch = "  Age not Matched to this profileid" + ",";
                    model.divmismatchData.push({ profileIDlocal: slide.ProfileID, mismath: strmismatch });
                }
                if (parseInt(slide.HeightInCentimeters) < parseInt(model.getpageloadobject.MinHeight) && parseInt(slide.HeightInCentimeters) > parseInt(model.getpageloadobject.MaxHeight)) {
                    strmismatch += "  Height not Matched to this profileid" + ",";
                    model.divmismatchData.push({ profileIDlocal: slide.ProfileID, mismath: strmismatch });
                }
                if (parseInt(slide.MaritalStatusID) != parseInt(model.getpageloadobject.maritalstatusid)) {
                    strmismatch += "  MaritalStatus not Matched to this profileid" + ",";
                    model.divmismatchData.push({ profileIDlocal: slide.ProfileID, mismath: strmismatch });
                }
                if (parseInt(slide.CasteID) != parseInt(model.getpageloadobject.casteid)) {
                    strmismatch += "  Caste not Matched to this profileid";
                    model.divmismatchData.push({ profileIDlocal: slide.ProfileID, mismath: strmismatch });
                }
                if (model.divmismatchData.length > 0) {
                    model.dynamicFunction = "getClickedCustID";
                    model.dynamicParams = slide;
                    modelpopupopenmethod.showPopupphotopoup('shortlistpopup.html', model.scope, '', "modalclassdashboardphotopopup");
                } else {
                    model.getClickedCustID(slide);
                }
            }
        };
        model.checkServicetoShortlist = function(slide) {
            model.slide = slide;
            if (slide.isShortlisted) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profile already shortlisted', 2000);
            } else {
                if (slide.serviceDate !== '') {
                    model.divmismatchData = [];
                    model.divmismatchData.push({ profileIDlocal: JSON.stringify(slide.ProfileID), mismath: slide.serviceDate });
                    model.dynamicFunction = "mismatchProfileCheck";
                    model.dynamicParams = slide;
                    modelpopupopenmethod.showPopupphotopoup('shortlistpopup.html', model.scope, '', "modalclassdashboardphotopopup");
                } else {
                    model.mismatchProfileCheck(slide);

                }
            }
        };
        model.mainShortListProfile = function() {
            model.shortlistmodel.headettemp = "templates/SearchpopupHeader.html";
            model.shortlistmodel.slides = _.where(model.slides, { isShortlisted: true });
            modelpopupopenmethod.showPopupphotopoup('mainShortListProfiles.html', model.scope, 'lg', "modalclassdashboardphotopopupinner");
        };
        model.shortListPopup = function() {
            var arrayshortListPopup = [];
            arrayshortListPopup = _.where(model.shortlistmodel.slides, { isshortlistaedgain: true });
            if (arrayshortListPopup.length > 0) {
                model.shortlistmodel.slides = _.where(model.shortlistmodel.slides, { isshortlistaedgain: true });
            } else {
                model.shortlistmodel.slides = (model.shortlistmodel.slides);
            }
        };
        model.shortlistmodel.checkServicetoShortlist = function(slide) {
            model.slide = slide;
            if (slide.isshortlistaedgain) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'You have already Shortlisted this Profile ID', 4000);
            } else {
                slide.isshortlistaedgain = true;
                alerts.timeoutoldalerts(model.scope, 'alert-success', 'profile has been shortlisted successfully', 4000);
            }

        };
        model.slidebind = function(old, news, array) {
            if (parseInt(model.topage) - parseInt(news) === 4) {
                switch (model.tablename) {
                    case "general":
                        model.submitgeneral(model.CgetDetails, (model.topage) + 1, (model.topage) + 10);
                        break;
                    case "advanced":
                        model.submitadvancedsearch(model.CgetDetails, (model.topage) + 1, (model.topage) + 10);
                        break;
                }

            }
        };
        model.statusbind = function(status) {
            if (status === "I") {
                status = "Proceed";
            } else if (status === "NI") {
                status = "Dont Proceed";
            } else if (status === "NV") {
                status = "Not Viewed";
            } else if (status === "V") {
                status = "Viewed";
            } else {
                status = "--";
            }
            return status;
        };
        model.proceedanddontproceed = function(typeofbtn, slide, AcceptStatus, MatchFollwupStatus) {
            var MobjViewprofile = {
                ExpressInrestID: slide.Cust_ProfileInterestsLog_ID,
                CustID: model.getpageloadobject.Cust_ID,
                FromCustID: model.getpageloadobject.Cust_ID,
                ToCustID: slide.Custid,
                AcceptStatus: AcceptStatus,
                MatchFollwupStatus: MatchFollwupStatus
            };
            console.log(MobjViewprofile);
            switch (typeofbtn) {
                case "btnProceed":
                    helpService.UpdateExpressIntrestViewfullprofile(MobjViewprofile).then(function(response) {
                        switch (response.data) {
                            case 1:
                                model.modalbodyID1 = "To Move the Match for MatchFollowup";
                                break;
                            case 2:
                            case 3:
                                model.modalbodyID1 = "You need to Upgrade online membership";
                                break;
                            default:
                                model.modalbodyID1 = "Updation failed please contact admin";
                                break;
                        }


                        modelpopupopenmethod.showPopupphotopoup('TabClosePopup.html', model.scope, '', "modalclassdashboardphotopopup");

                    });
                    break;
                case "btnDontProceed":
                    helpService.UpdateExpressIntrestViewfullprofile(MobjViewprofile).then(function(response) {
                        switch (response.data) {
                            case 1:
                                model.modalbodyID1 = "Oops go through your search";
                                break;
                            case 2:
                            case 3:
                                model.modalbodyID1 = "You need to Upgrade online membership";
                                break;
                            default:
                                model.modalbodyID1 = "Updation failed please contact admin";
                                break;
                        }
                        modelpopupopenmethod.showPopupphotopoup('TabClosePopup.html', model.scope, '', "modalclassdashboardphotopopup");
                    });
                    break;
            }

        };

        model.sendtoServices = function() {
            model.close();
            model.cloumsarr = [];
            model.Toprofileids = [];
            _.each(model.shortlistmodel.slides, function(item) {
                model.cloumsarr.push(item.Custid);
            });
            var custids = model.cloumsarr.length > 0 ? (model.cloumsarr).toString() : null;
            searchpageServices.getprofileidcustdetails(custids).then(function(response) {
                model.FromProfileId = model.getpageloadobject.ProfileID;
                _.each(response.data, function(item) {
                    model.Toprofileids.push(item.ProfileID);
                });
                expressInterestModel.FromProfileID(model.FromProfileId);
                timeout(function() {
                    expressInterestModel.exiObj.txtFromprofileID = model.FromProfileId;
                    expressInterestModel.disableinput = true;
                }, 500);
                _.each(model.Toprofileids, function(item) {
                    expressInterestModel.getImages(item);
                    // timeout(function() {
                    expressInterestModel.SelectProfilelst.push({ "label": item, "title": item, "value": expressInterestModel.strimages });
                    // }, 100);

                });
                modelpopupopenmethod.showPopupphotopoup('app/expressInterest/index.html', model.scope, 'lg', "");
            });
        };

        model.bookmark = function() {
            var strToCustIDs = [];
            _.each(model.shortlistmodel.slides, function(item) {
                strToCustIDs.push(item.Custid);
            });
            var custids = strToCustIDs.length > 0 ? (strToCustIDs).toString() : null;
            var obj = {
                FromCustID: model.getpageloadobject.Cust_ID,
                ToCustID: custids,
                BookmaredFlag: 1,
                StrTocustIDs: custids
            };
            searchpageServices.insertbookmark(obj).then(function(response) {
                if (response.data === 1) {
                    alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Bookmarked SuccessFully', 2000);
                } else {
                    alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Bookmark failed', 2000);
                }
            });
        };
        model.viewfullprofile = function(profileid) {
            window.open("Viewfullprofile/" + profileid, "_blank");
        };
        model.ticketclass = function(status) {
            var background = "#fff";
            if (parseInt(status) === 258) {
                background = "#C8E6E6";
            }
            return background;
        };
        model.tickethistoryupdation = function(ticket) {
            modelpopupopenmethod.showPopupphotopoup('tickethistory.html', model.scope, 'md', "modalclassdashboardphotopopup");
        };

        /**
         * Array Creation for controls creation for Serches 
         */

        model.getControlList = function() {
            model.domData = [{
                headerName: 'Education and Profession',
                controlList: [{ divClear: true, type: 'EducationCatgory', ngModel: 'EducationCatgoryID', labelName: 'Education category', controlType: 'dropdown', isShow: true, dataBind: 'educationcategorywithoutselect', dataSource: 'educationcategory', validation: true },
                    { type: 'educationGroup', ngModel: 'educationGroupId', labelName: 'Education', controlType: 'dropdown', isShow: true, dataSource: 'Educationgroup', validation: true },
                    { ngModel: 'EducationspeciallisationId', labelName: 'Specialization', controlType: 'dropdown', isShow: true, dataSource: 'educationspeciallisation', validation: true },
                    { ngModel: 'University', labelName: 'University', controlType: 'textBox', isShow: true, validation: true },
                    { divClear: true, ngModel: 'photograde', labelName: 'Photo', controlType: 'checkBoxList', dataSource: 'photogradearray', isShow: true, validation: true },
                    { ngModelFrom: 'dateofregfrom', ngModelTo: 'dateofregto', labelName: 'DOR', controlType: 'datePicker', isShow: true, validation: true },
                    { typeofdata: 'Ageselect', ngModelFrom: 'ageFrom', ngModelTo: 'ageTo', labelName: 'Age', controlType: 'dualDropdown', isShow: true, validation: true },
                ]
            }];
        };
        model.getControlList();
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('searchpageModel', factory);
    factory.$inject = ['$http', 'searchpageServices', 'arrayConstants', 'SelectBindServiceApp',
        'getArraysearch', '$timeout', 'helperservice',
        'authSvc', 'alert', 'Commondependency', '$filter', 'modelpopupopenmethod', 'complex-slide-config', '$sce',
        'expressInterestModel'
    ];
})(angular);