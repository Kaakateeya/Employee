(function(angular) {
    'use strict';

    function factory($http, searchpageServices, arrayConstants, SelectBindServiceApp, getArray, timeout,
        helpService, authSvc, alerts, Commondependency, filter, modelpopupopenmethod, config, $sce) {
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
        model.activatedmobile = true;
        model.searchpopuptext = "General Search";
        model.divcontrollsbind = 0;
        model.Relationshipname = "";
        model.relationshippopup = null;
        model.typrofsearch = "2";
        model.sidebarnavshow = true;
        model.mySidenavdiv = false;
        model.mystylenamediv = true;
        var count = 0;
        model.hdnCustIdsForAlert = "";
        model.hdnshortlistProfile = "";
        model.hdnCurrentSlideVal = "";
        model.headervisileble = false;
        model.dynamicFunction = '';
        model.slidephotos = [];
        model.active = 0;
        model.templateUrl = "templates/angularSlide.html";
        model.arrayslide = [{
            Age: 27,
            AgeMax: null,
            Agemax: null,
            Agemin: null,
            // ApplicationPhotoPath: "~\Images\ProfilePics\KMPL_47098_Images\img2_Images\210470984_FullPhoto.jpg,~\Images\ProfilePics\KMPL_47098_Images\img3_Images\210470984_FullPhoto.jpg,~\Images\ProfilePics\KMPL_47098_Images\img1_Images\210470984_FullPhoto.jpg",
            Caste: "Telugu-Balija",
            CasteID: 403,
            Color: "Fair",
            Cust_ID: "47098",
            Cust_ProfileInterestsLog_ID: null,
            CustomerApplicationPhoto: null,
            CustomerFullPhoto: "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_47098_Images/Img2_Images/210470984_FullPhoto.jpg",
            DOB: "24-May-1989",
            EduGroupnamenew: "--",
            Education: null,
            EducationGroup: "BE",
            Employeedin: null,
            FFNative: "Dindigul",
            FirstName: "R",
            FromTicketID: null,
            FromTicketIdSuf: "--",
            Gender: "Male",
            GenderID: null,
            Gothram: "THILAGA",
            Height: "5'8 in - 172 cms",
            HeightInCentimeters: 21,
            Heightmax: null,
            Heightmin: null,
            HoroscopePath: "--",
            HoroscopeStatus: 0,
            Income: "40000",
            Intercaste: false,
            IsConfidential: false,
            JobLocation: "Trichy",
            KMPLID: "TYBAM2314",
            LastName: "BAGESH PRABHU",
            MFNative: "Madurai",
            MaritalStatusID: 43,
            MaxHeight: null,
            MinHeight: null,
            Mystatus: "--",
            Name: null,
            NoOfBrothers: 1,
            NoOfSisters: 0,
            OppStatus: "--",
            Ownerflag: false,
            // Photo: "~\Images\ProfilePics\KMPL_47098_Images\img2_Images\210470984_FullPhoto.jpg",
            PhotoCount: 3,
            PhotoNames: "img2.jpg,img3.jpg,img1.jpg",
            PlaceOfBirth: "Madurai",
            Profession: "Admin Professional",
            ProfileID: "121333",
            ProfileStatusID: null,
            Property: "2500",
            RegistrationDate: null,
            Star: "Poorvashada",
            SubCaste: null,
            SuperConfidentila: 0,
            SurName: null,
            TOB: "20:30:00",
            ToTicketID: null,
            ToTicketIDSuf: "--",
            TotalRows: 498,
            TotalRowsKeyword: null,
            Totalpages: null,
            companyname: null,
            countrylivingin: "India",
            currency: "Rs",
            educationspecialisation: null,
            email: "rkkalp1960@gmail.com",
            fathercaste: "--",
            imageurl: null,
            maritalstatus: "Unmarried",
            mothercaste: "--",
            mothertongue: null,
            paid: 1,
            serviceDate: ""
        }, {
            Age: 27,
            AgeMax: null,
            Agemax: null,
            Agemin: null,
            //ApplicationPhotoPath: "~\Images\ProfilePics\KMPL_47098_Images\img2_Images\210470984_FullPhoto.jpg,~\Images\ProfilePics\KMPL_47098_Images\img3_Images\210470984_FullPhoto.jpg,~\Images\ProfilePics\KMPL_47098_Images\img1_Images\210470984_FullPhoto.jpg",
            Caste: "Telugu-Balija",
            CasteID: 403,
            Color: "Fair",
            Cust_ID: "47098",
            Cust_ProfileInterestsLog_ID: null,
            CustomerApplicationPhoto: null,
            CustomerFullPhoto: "http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_47098_Images/Img2_Images/210470984_FullPhoto.jpg",
            DOB: "24-May-1989",
            EduGroupnamenew: "--",
            Education: null,
            EducationGroup: "BE",
            Employeedin: null,
            FFNative: "Dindigul",
            FirstName: "R",
            FromTicketID: null,
            FromTicketIdSuf: "--",
            Gender: "Male",
            GenderID: null,
            Gothram: "THILAGA",
            Height: "5'8 in - 172 cms",
            HeightInCentimeters: 21,
            Heightmax: null,
            Heightmin: null,
            HoroscopePath: "--",
            HoroscopeStatus: 0,
            Income: "40000",
            Intercaste: false,
            IsConfidential: false,
            JobLocation: "Trichy",
            KMPLID: "TYBAM2314",
            LastName: "BAGESH PRABHU",
            MFNative: "Madurai",
            MaritalStatusID: 43,
            MaxHeight: null,
            MinHeight: null,
            Mystatus: "--",
            Name: null,
            NoOfBrothers: 1,
            NoOfSisters: 0,
            OppStatus: "--",
            Ownerflag: false,
            //  Photo: "~\Images\ProfilePics\KMPL_47098_Images\img2_Images\210470984_FullPhoto.jpg",
            PhotoCount: 3,
            PhotoNames: "img2.jpg,img3.jpg,img1.jpg",
            PlaceOfBirth: "Madurai",
            Profession: "Admin Professional",
            ProfileID: "210470984",
            ProfileStatusID: null,
            Property: "2500",
            RegistrationDate: null,
            Star: "Poorvashada",
            SubCaste: null,
            SuperConfidentila: 0,
            SurName: null,
            TOB: "20:30:00",
            ToTicketID: null,
            ToTicketIDSuf: "--",
            TotalRows: 498,
            TotalRowsKeyword: null,
            Totalpages: null,
            companyname: null,
            countrylivingin: "India",
            currency: "Rs",
            educationspecialisation: null,
            email: "rkkalp1960@gmail.com",
            fathercaste: "--",
            imageurl: null,
            maritalstatus: "Unmarried",
            mothercaste: "--",
            mothertongue: null,
            paid: 1,
            serviceDate: ""
        }];
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
                    console.log(model.getpageloadobject);
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
            model.divcontrollsbind = 1;
            model.maritalstatus = model.removeSelect(arrayConstants.MaritalStatus);
            model.Religion = model.removeSelect(arrayConstants.Religion);
            model.Mothertongue = model.removeSelect(arrayConstants.Mothertongue);
            model.visastatus = model.removeSelect(arrayConstants.visastatus);
            model.stars = model.removeSelect(arrayConstants.stars);
            model.Country = getArray.GArray('Country');
            model.Professiongroup = getArray.GArray('ProfGroup');
            model.educationcategory = model.removeSelect(arrayConstants.educationcategorywithoutselect);
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
            model.generalsearch.Applicationstatus = model.arrayToString("54");
            model.generalsearch.Showprofile = model.arrayToString("1");
            model.generalsearch.mothertongue = model.arrayToString("1");
            model.generalsearch.Religion = model.arrayToString("1");
            model.advancedsearch.Applicationstatus = model.arrayToString("54");
            model.advancedsearch.Showprofileadvanced = model.arrayToString("1");
            model.advancedsearch.advancedmothertongue = model.arrayToString("1");
            model.advancedsearch.advancedReligion = model.arrayToString("1");
            model.Caste = Commondependency.casteDepedency(model.generalsearch.Religion, model.generalsearch.mothertongue);
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
                model.slideshowarray = [];
                _.each(response.data, function(item) {
                    model.slideshowarray.push(item);
                });
                if (model.typrofsearch === "2") {
                    model.headervisileble = true;
                    model.tablename = "general";
                    //  model.scope.$broadcast("generalsearchslide", model.slideshowarray, "general", model.getpageloadobject, frompage);
                    model.totalRecords = model.slideshowarray[0].TotalRows;
                    if (parseInt(frompage) === 1) {
                        model.setSlides(model.slideshowarray, parseInt(topage));
                    } else {
                        model.addSlides(model.slideshowarray, parseInt(topage));
                    }
                } else {
                    model.scope.$broadcast('submittablesearch', model.slideshowarray, frompage);
                }
                model.divcontrolls = false;
                model.slideshowtrue = true;
            });

        };
        model.closepopup = function() {

            if (model.divcontrollsbind === 0) {
                model.init();
            }
            model.sidebarnavshow = true;
            alerts.dynamicpopupclose();
        };
        model.submitadvancedsearch = function(object, frompage, topage) {
            model.topage = topage;
            console.log(object);
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
                console.log(response);
                model.slideshowarray = [];
                _.each(response.data, function(item) {
                    model.slideshowarray.push(item);
                });

                if (model.typrofsearch === "2") {
                    model.tablename = "advanced";
                    model.totalRecords = model.slideshowarray[0].TotalRows;
                    if (parseInt(frompage) === 1) {
                        model.setSlides(model.slideshowarray, parseInt(topage));
                    } else {
                        model.addSlides(model.slideshowarray, parseInt(topage));
                    }
                    // model.scope.$broadcast("generalsearchslide", model.slideshowarray, "advanced", model.getpageloadobject, frompage);
                } else {
                    model.scope.$broadcast('submittablesearch', model.slideshowarray, frompage);
                }
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
        model.relationshipbind = function(flag, profileid, about) {
            searchpageServices.getrelationships(flag, profileid, about).then(function(response) {
                console.log(response);
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
            var colors = "selectborderclass";
            if (value !== 0 && value !== "0" && value !== "" && value !== undefined && value !== null) {
                colors = "selectborderclasscolor";
                $('#' + id).next().find('button').addClass("bacg");
            } else {
                colors = "selectborderclass";
                $('#' + id).next().find('button').removeClass("bacg");
            }
            return colors;
        };

        model.applycolorsfortextboxes = function(value, id) {
            var colors = "textboxremvecolor";
            if (value !== "" && value !== undefined && value !== null) {
                colors = "bacg";
                $('#' + id).addClass("bacg");
            } else {
                colors = "textboxremvecolor";
                $('#' + id).removeClass("bacg");
            }
            return colors;
        };

        model.applycolorsfortextboxesdate = function(value, id) {
            var colors = "textboxremvecolor";
            if (value !== "" && value !== undefined && value !== null) {
                colors = "bacg";
                $('#' + id).next().find('input').addClass("bacg");
            } else {
                colors = "textboxremvecolor";
                $('#' + id).next().find('input').removeClass("bacg");
            }
            return colors;
        };
        model.close = function(type) {
            if (type === "inner") {
                model.innerslideshort = false;
                model.mainshortlist = true;
                modelpopupopenmethod.closepopuppoptopopup();
            } else {
                modelpopupopenmethod.closepopuppoptopopup();
            }
        };

        model.getClickedCustID = function() {
            if (model.dynamicFunction === "getClickedCustID" || model.dynamicFunction === "mismatchProfileCheck") {
                model.close();
            }

            var objdynamic = model.dynamicobj;
            var StVal = model.hdnshortlistProfile;
            var mismath;
            if (StVal === '') {
                StVal = objdynamic.custids;
                mismath = [objdynamic.custids];
            } else {
                StVal += "," + objdynamic.custids;
                mismath = StVal.split(",");
            }
            alerts.timeoutoldalerts(model.scope, 'alert-success', 'profile has been shortlisted successfully', 2000);
            model.hdnshortlistProfile = StVal;
            model.hdnCustIdsForAlert = StVal;

            var shortlisttxt = "  Shortlisted";
            if (mismath.length <= 10) {
                count++;
                $("#progessDiv").html("<div class='progress-bar progress-bar-striped progress-bar-danger active' style='width: " + mismath.length + "%'><span >" + mismath.length + shortlisttxt + " </span></div>");
            } else if (mismath.length > 10 && mismath.length <= 30) {
                count = mismath.length == 11 ? 1 : (count + 1);
                $("#progessDiv").html("<div class='progress-bar progress-bar-striped progress-bar-danger' style='width:10%;'><span></span></div>");
                $("#progessDiv").append("<div class='progress-bar progress-bar-striped progress-bar-warning active' style='width: " + count + "%'><span >" + mismath.length + shortlisttxt + " </span></div>");
            } else if (mismath.length > 30 && mismath.length <= 50) {
                count = mismath.length == 31 ? 1 : (count + 1);
                $("#progessDiv").html("<div class='progress-bar progress-bar-striped progress-bar-danger' style='width:10%;'><span></span></div><div class='progress-bar progress-bar-striped progress-bar-warning' style='width:20%;'><span></span></div>");
                $("#progessDiv").append("<div class='progress-bar progress-bar-striped progress-bar-info active' style='width: " + count + "%'><span >" + mismath.length + shortlisttxt + " </span></div>");
            } else {
                count = mismath.length == 51 ? 1 : (count + 1);
                $("#progessDiv").html("<div class='progress-bar progress-bar-striped progress-bar-danger' style='width:10%;'><span></span></div><div class='progress-bar progress-bar-striped progress-bar-warning' style='width:20%;'><span></span></div><div class='progress-bar progress-bar-striped progress-bar-info' style='width: 20%'><span > </span></div>");
                $("#progessDiv").append("<div class='progress-bar progress-bar-striped progress-bar-success active' style='width: " + count + "%'><span >" + mismath.length + shortlisttxt + " </span></div>");
            }
            return false;
        };

        // model.mismatchProfileCheck = function(custids, profileID, age, height, maritalstatus, caste, personalobj) {
        model.mismatchProfileCheck = function() {

            var objdynamic = model.dynamicobj;
            var StVal = model.hdnshortlistProfile;
            var StValall = model.hdnCustIdsForAlert;
            if (StValall.indexOf(objdynamic.custids) != -1) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profile already shortlisted', 2000);
            } else {
                var strmismatch = '';
                if (parseInt(objdynamic.age) < parseInt(objdynamic.personalobj.AgeMin) && parseInt(objdynamic.age) > parseInt(objdynamic.personalobj.AgeMax)) {
                    strmismatch = "  Age not Matched to this profileid" + ",";
                }
                if (parseInt(objdynamic.height) < parseInt(objdynamic.personalobj.MinHeight) && parseInt(objdynamic.height) > parseInt(objdynamic.personalobj.MaxHeight)) {
                    strmismatch += "  Height not Matched to this profileid" + ",";
                }
                if (parseInt(objdynamic.maritalstatus) != parseInt(objdynamic.personalobj.maritalstatusid)) {
                    strmismatch += "  MaritalStatus not Matched to this profileid" + ",";
                }
                if (parseInt(objdynamic.caste) != parseInt(objdynamic.personalobj.casteid)) {
                    strmismatch += "  Caste not Matched to this profileid";
                }

                if (strmismatch !== '') {
                    var mismath = strmismatch.split(",");
                    model.divmismatchData = '';
                    model.divfooter = '';
                    var profileIDlocal = JSON.stringify(objdynamic.profileID);
                    var mismatch = [];
                    for (var i = 0; i < mismath.length; i++) {
                        mismatch.push($sce.trustAsHtml("<a href=javascript:void(0) onclick=ViewProfilewithvalue(" + profileIDlocal + ");>" + objdynamic.profileID + "</a>" + "<f style='color:black;'> Already service done with this profileid On </f>" + "<f style='color:Red;font-weight:bold;font-size:14px;'>" + mismath[i] + "</f>" + "</br>" + ""));
                    }
                    model.divmismatchData = $sce.trustAsHtml(mismatch.toString());

                    model.dynamicFunction = "getClickedCustID";
                    //  model.divfooter = $sce.trustAsHtml("<button  class='md-raised md-warn md-hue-2' ng-click='page.model.getClickedCustID(" + objdynamic.custids + ")' >Shortlist</button>" +
                    //  "<button  class='md-raised md-hue-1' ng-click='page.model.close()'>Cancel</button>");
                    modelpopupopenmethod.showPopupphotopoup('shortlistpopup.html', model.scope, '', "modalclassdashboardphotopopup");
                } else {
                    model.getClickedCustID();
                }
            }
        };

        model.checkServicetoShortlist = function(custids, profileID, age, height, maritalstatus, caste, Servicedate, personalobj) {
            var StValall = model.hdnCustIdsForAlert;
            var profileIDlocal = JSON.stringify(profileID);
            model.dynamicobj = {
                custids: custids,
                profileID: profileID,
                age: age,
                height: height,
                maritalstatus: maritalstatus,
                caste: caste,
                personalobj: personalobj
            };
            if (StValall.indexOf(custids) != -1) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profile already shortlisted', 2000);
            } else {
                if (Servicedate !== '') {
                    model.divmismatchData = '';
                    model.divfooter = '';
                    model.divmismatchData = $sce.trustAsHtml("<a id=lnkmismatchProfileid href=javascript:void(0) onclick=ViewProfilewithvalue(" + profileIDlocal + ");>" + profileID + "</a>" + "<f style='color:black;'> Already service done with this profileid On </f>" + "<f style='color:Red;font-weight:bold;font-size:14px;'>" + Servicedate + "</f>" + "</br>" + "");
                    // model.divfooter = $sce.trustAsHtml("<button  class='md-raised md-warn md-hue-2'  
                    //ng-click='page.model.mismatchProfileCheck(" + custids + "," + profileID + "," + age + ","
                    // + height + "," + maritalstatus + "," + caste + "," + personalobj + ")' >Shortlist</button>" +
                    //    "<button   class='md-raised md-hue-1' ng-click='page.model.close()'>Cancel</button>");
                    model.dynamicFunction = "mismatchProfileCheck";
                    modelpopupopenmethod.showPopupphotopoup('shortlistpopup.html', model.scope, '', "modalclassdashboardphotopopup");
                } else {
                    model.mismatchProfileCheck();

                }
            }
        };

        model.shortListPopup = function() {
            var StValall = model.hdnshortlistProfile;
            if (StValall !== '') {
                model.innersetSlides(model.arrayslide);
                model.scope.$broadcast("slidebindinner", model.arrayslide);
                //modelpopupopenmethod.showPopupphotopoup('mainShortListProfiles.html', model.scope, 'lg', "modalclassdashboardphotopopup");
            } else {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please shortlist any Profile', 2000);
            }
        };
        model.mainShortListProfile = function() {
            var hdnshortlistProfile = model.hdnshortlistProfile;
            if (hdnshortlistProfile !== "" && hdnshortlistProfile !== undefined) {
                var hdnCurrentSlideVal = model.hdnCurrentSlideVal;
                if (hdnshortlistProfile !== "" || hdnCurrentSlideVal !== "") {
                    var CustIDsCount = (hdnshortlistProfile !== "" ? hdnshortlistProfile : "0").split(',');
                    if (hdnshortlistProfile !== "" && hdnCurrentSlideVal === "") {
                        hdnshortlistProfile = (hdnCurrentSlideVal);
                    } else if (hdnshortlistProfile !== "" && hdnCurrentSlideVal !== "") {
                        if (hdnshortlistProfile.indexOf(hdnCurrentSlideVal) != -1) {} else {
                            hdnshortlistProfile += "," + hdnCurrentSlideVal;
                            model.hdnshortlistProfile = (hdnshortlistProfile);
                        }
                    }
                    model.shortListPopup();
                }
            } else {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please ShortList Profiles', 2000);

            }
        };

        model.InnerShortList = function(custID) {
            var InnerShortList = model.hdnCurrentSlideVal;
            if (InnerShortList.indexOf(custID) != -1) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'You have already Shortlisted this Profile ID', 4000);
            } else {
                InnerShortList = InnerShortList === '' ? custID : (InnerShortList + "," + custID);
                model.hdnCurrentSlideVal = InnerShortList;
                model.hdnshortlistProfile = InnerShortList;
                alerts.timeoutoldalerts(model.scope, 'alert-success', 'profile has been shortlisted successfully', 4000);
            }

        };
        model.slidebind = function(old, news, array) {
            console.log(news);
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

        model.proceedanddontproceed = function(typeofbtn, fromcustid, tocustid, logid) {
            switch (typeofbtn) {
                case "btnProceed":
                    var MobjViewprofile = {
                        ExpressInrestID: logid,
                        CustID: fromcustid,
                        FromCustID: fromcustid,
                        ToCustID: tocustid,
                        AcceptStatus: 1,
                        MatchFollwupStatus: 1
                    };
                    helperservice.UpdateExpressIntrestViewfullprofile(MobjViewprofile).then(function(response) {
                        alerts.dynamicpopup("TabClosePopup.html", model.scope, uibModal);
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
                    });
                    break;
                case "btnDontProceed":
                    var MobjViewprofiledont = {
                        ExpressInrestID: logid,
                        CustID: fromcustid,
                        FromCustID: fromcustid,
                        ToCustID: tocustid,
                        AcceptStatus: 2,
                        MatchFollwupStatus: 2
                    };
                    helperservice.UpdateExpressIntrestViewfullprofile(MobjViewprofiledont).then(function(response) {
                        alerts.dynamicpopup("TabClosePopup.html", model.scope, uibModal);
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
                    });
                    break;
            }

        };


        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('searchpageModel', factory);
    factory.$inject = ['$http', 'searchpageServices', 'arrayConstants', 'SelectBindServiceApp',
        'getArraysearch', '$timeout', 'helperservice',
        'authSvc', 'alert', 'Commondependency', '$filter', 'modelpopupopenmethod', 'complex-slide-config', '$sce'
    ];
})(angular);