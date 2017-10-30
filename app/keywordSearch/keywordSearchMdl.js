(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('keywordSearchModel', factory);
    factory.$inject = ['keywordSearchService', 'complex-grid-config', 'complex-slide-config', 'modelpopupopenmethod', 'helperservice', 'alert', 'arrayConstants'];

    function factory(keywordSearchService, configgrid, configslide, modelpopupopenmethod, helperservice, alertss, arrayConstants) {
        var model = {};
        model.slide = {};
        model.grid = {};
        model.slide.config = configslide;
        model.applicationids = [54];
        model.slide.dobshow = true;
        model.grid.showsearchrows = true;
        model.grid.showsearch = true;
        model.grid.showpaging = true;
        model.grid.myprofileexcel = true;
        model.grid.normalexcel = true;
        model.showplus = false;
        model.object = {
            Keyworddlikesrch: {}
        };
        model.Searchfields = [
            { Text: "ContactNoAll", value: "ContactNo_All" },
            { Text: "CAboutMe", value: "CAboutMe" },
            { Text: "CAboutFamily", value: "CAboutFamily" },
            { Text: "CBornCitigen", value: "CBornCitigen" },
            { Text: "CBodyType", value: "CBodyType" },
            { Text: "CBranch", value: "CBranch" },
            { Text: "CColor", value: "CColor" },
            { Text: "CCountryOfBirth", value: "CCountryOfBirth" },
            { Text: "CStateOfBirth", value: "CStateOfBirth" },
            { Text: "CDistrictOfBirth", value: "CDistrictOfBirth" },
            { Text: "CCountry Working", value: "countryworking" },
            { Text: "CState Working", value: "stateworking" },
            { Text: "CDistrict Working", value: "districtworking" },
            { Text: "CCity Working", value: "cityworking" },
            { Text: "CCityOfBirth", value: "CCityOfBirth" },
            { Text: "CDOB", value: "CDOB" },
            { Text: "CDrink", value: "CDrink" },
            { Text: "CDiet", value: "CDiet" },
            { Text: "CDateofReg", value: "CDateofReg" },
            { Text: "CEducation all", value: "CEducationAll" },
            { Text: "CEdu category", value: "CEducationCategory" },
            { Text: "CEducation", value: "CEduGroup" },
            { Text: "CEdu Specialization", value: "CEduSplecialization" },
            { Text: "CUniversity", value: "CEduUniversity" },
            { Text: "CCollege", value: "CEduCollege" },
            { Text: "CEdu country", value: "CEduCountry" },
            { Text: "CEdu state", value: "CEduState" },
            { Text: "CEdu district", value: "CEduDistrict" },
            { Text: "CEdu city", value: "CEduCity" },
            { Text: "CEdu merits", value: "CEduMerits" },
            { Text: "CEdupass of year", value: "CEduPass_Year" },
            { Text: "CEmployeed In", value: "EmployeedIn" },
            { Text: "CEducationGrade", value: "CEducationGrade" },
            { Text: "CFamilyGrade", value: "CFamilyGrade" },
            { Text: "Name", value: "CFName" },
            { Text: "SurName", value: "CLName" },
            { Text: "CProfession all", value: "CProfAll" },
            { Text: "CProfessional Group", value: "Professionalgroup" },
            { Text: "CProfession", value: "Profession" },
            { Text: "CProfession Details", value: "professionDetails" },
            { Text: "CProfessionStatus", value: "CProfessionStatus" },
            { Text: "CCompany Name", value: "Companyname" },
            { Text: "CMonthly Salary", value: "monthlysalary" },
            { Text: "CWorking From Date", value: "workingfromdate" },
            { Text: "CpropertyType", value: "CpropertyType" },
            { Text: "CPropertyValue", value: "CPropertyValue" },
            { Text: "CPropertyDescription", value: "CPropertyDescription" },
            { Text: "CPhysicalStatus", value: "CPhysicalStatus" },
            { Text: "CParentCaste", value: "CParentCaste" },
            { Text: "CPropertyGrade", value: "CPropertyGrade" },
            { Text: "CPhotoGrade", value: "CPhotoGrade" },
            { Text: "CPaadam", value: "CPaadam" },
            { Text: "CRelision", value: "CRelision" },
            { Text: "CRegStatus", value: "CRegStatus" },
            { Text: "CSmoke", value: "CSmoke" },
            { Text: "CStarLanguage", value: "CStarLanguage" },
            { Text: "CStar", value: "CStar" },
            { Text: "CRaasi", value: "CRaasi" },
            { Text: "CLagnam", value: "CLagnam" },
            { Text: "CGothram", value: "CGothram" },
            { Text: "CMaternalGothram", value: "CMaternalGothram" },
            { Text: "CMotherTongue", value: "CMotherTongue" },
            { Text: "CKujadosham", value: "CKujadosham" },
            { Text: "CWebsiteStatus", value: "CWebsiteStatus" },
            { Text: "Father All", value: "FAllFields" },
            { Text: "FName", value: "FFirstName" },
            { Text: "FEducation", value: "FEducationDetails" },
            { Text: "FProfession", value: "FProfessionDetails" },
            { Text: "Fcompany Name", value: "FCompanyId" },
            { Text: "Fjob Location", value: "FJobLocation" },
            { Text: "FMobile/LandLine", value: "FNumber" },
            { Text: "FEmail", value: "Femail" },
            { Text: "FFName", value: "FFatherName" },
            { Text: "FFmobile/Landline", value: "FFatherContactNumber" },
            { Text: "FFstate", value: "FFStateName" },
            { Text: "FFDistrict", value: "FFDistrictName" },
            { Text: "FFNative Place", value: "FFNativePlace" },
            //mother
            { Text: "Mother All", value: "MAllFields" },
            { Text: "Mother Name", value: "MFirstName" },
            { Text: "M LastName", value: "MLastName" },
            { Text: "MEducation", value: "MEducationDetails" },
            { Text: "Mprofession", value: "MProfessionDetails" },
            { Text: "Mcompany Name", value: "MCompanyId" },
            { Text: "MJob location", value: "MJobLocation" },
            { Text: "MMobile/Land Line", value: "MNumber" },
            { Text: "MEmail", value: "Memail" },
            { Text: "MFName", value: "MFatherFirstName" },
            { Text: "MFSurName", value: "MFatherLastName" },
            { Text: "MFmobile/Land", value: "MFatherContactNumber" },
            { Text: "MFState", value: "MFStateName" },
            { Text: "MFDistrict", value: "MFDistrictName" },
            { Text: "MFNative Place", value: "MFNativePlace" },
            //Brother
            { Text: "Brother All", value: "Br_AllFields" },
            { Text: "CBname", value: "Br_Name" },
            { Text: "CBeducation", value: "Br_Education" },
            { Text: "CBprofession", value: "Br_Profession" },
            { Text: "CBcompany", value: "Br_CompanyNAME" },
            { Text: "CBjoblocation", value: "Br_Joblocation" },
            { Text: "CBMobile/land", value: "BrContactNo" },
            { Text: "CBemail", value: "Br_Email" },
            { Text: "CBWname", value: "Brw_Name" },
            { Text: "CBWeducation", value: "Brw_Education" },
            { Text: "CBWprofession", value: "Brw_Profession" },
            { Text: "CBWcompany Name", value: "Brw_CompanyNAME" },
            { Text: "CBWjob location", value: "Brw_Joblocation" },
            { Text: "CBWMobile/land", value: "BrwContactNo" },
            { Text: "CBWemail", value: "Brw_Email" },
            { Text: "CBWFSurname", value: "Brwf_Surname" },
            { Text: "CBWFName", value: "Brwf_Name" },
            { Text: "CBWFState", value: "BrwfStateName" },
            { Text: "CBWFdistrict", value: "BrwfDistrictName" },
            { Text: "CBWFNative Place", value: "BrwfCity" },
            //sister
            { Text: "Sister All", value: "Sr_AllFields" },
            { Text: "CSName", value: "Sr_Name" },
            { Text: "CSeducation", value: "Sr_Education" },
            { Text: "CSprofession", value: "Sr_Profession" },
            { Text: "CScompany", value: "Sr_CompanyNAME" },
            { Text: "CSjoblocation", value: "Sr_Joblocation" },
            { Text: "CSMobile/Land", value: "SrContactNo" },
            { Text: "CSemail", value: "Sr_Email" },
            { Text: "CSHName", value: "Srh_Name" },
            { Text: "CSHeducation", value: "Srh_Education" },
            { Text: "CSHprofession", value: "Srh_Profession" },
            { Text: "CSHcompany Name", value: "Srh_CompanyNAME" },
            { Text: "CSHjob location", value: "Srh_Joblocation" },
            { Text: "CSHMobile/land", value: "SrhContactNo" },
            { Text: "CSHemail", value: "Srh_Email" },
            { Text: "CSHFSurname", value: "Srhf_Surname" },
            { Text: "CSHFName", value: "Srhf_Name" },
            { Text: "CSHFstate", value: "SrhfStateName" },
            { Text: "CSHFdistrict", value: "SrhfDistrictName" },
            { Text: "CSHFNative Place", value: "SrhfCity" },
            //father brother
            { Text: "Father Brother All", value: "FB_AllFields" },
            { Text: "FB(E/Y)", value: "FB_ElderYounger" },
            { Text: "FBName", value: "FB_Name" },
            { Text: "FBEducation", value: "FB_Education" },
            { Text: "FBProfession", value: "FB_Profession" },
            { Text: "FBMobile/land", value: "FB_Contactnumber" },
            { Text: "FBEmail", value: "FB_Email" },
            { Text: "FBCurrent Location", value: "FB_professionlocation" },
            //father sister
            { Text: "Father Sister All", value: "FS_AllFields" },
            { Text: "FSName", value: "FS_Name" },
            { Text: "FSHName", value: "FSH_Name" },
            { Text: "FSHSur Name", value: "FSH_Surname" },
            { Text: "FSHEducation", value: "FSH_Education" },
            { Text: "FSHProfession", value: "FSH_Profession" },
            { Text: "FSHMobile/Land", value: "FSHContactNo" },
            { Text: "FSHEmail", value: "FSH_Email" },
            { Text: "FSHCurrent Location", value: "FSH_ProfessionLocation" },
            { Text: "FSHstate", value: "FSHStateName" },
            { Text: "FSHDistrict", value: "FSHDistrictName" },
            { Text: "FSHNative Place", value: "FSHCityName" },
            //Mother Brother 
            { Text: "Mother Brother All", value: "MB_AllFields" },
            { Text: "MBName", value: "MB_Name" },
            { Text: "MBEducation", value: "MB_Education" },
            { Text: "MBProfession", value: "MB_Profession" },
            { Text: "MBMobile/land", value: "MB_ContactNo" },
            { Text: "MBEmail", value: "MB_Email" },
            { Text: "MBCurrent Location", value: "MB_professionlocation" },
            ///Mothrer sister
            { Text: "Mother Sister All", value: "MS_AllFields" },
            { Text: "MSName", value: "MS_Name" },
            { Text: "MSHName", value: "MSH_Name" },
            { Text: "MSHSur Name", value: "MSH_Surname" },
            { Text: "MSHEducation", value: "MSH_Education" },
            { Text: "MSHProfession", value: "MSH_Profession" },
            { Text: "MSHMobile/Land", value: "MSH_ContactNo" },
            { Text: "MSHEmail", value: "MSH_Email" },
            { Text: "MSHCurrent Location", value: "MSH_ProfessionLocation" },
            { Text: "MSHstate", value: "MSHStateName" },
            { Text: "MSHDistrict", value: "MSHDistrictName" },
            { Text: "MSHNative Place", value: "MSHCityName" },
            { Text: "SFName", value: "SFName" },
            { Text: "SLName", value: "SLName" },
            { Text: "Spouse Education", value: "SpouseEducation" },
            { Text: "Spouse Profession", value: " SpouseProfession" },
            { Text: "Spouse Married On", value: "SpouseMarriedOn" },
            { Text: "Spouse Separated Date", value: "SpouseSeparatedDate" },
            { Text: "Spouse Legally Divorced", value: "SpouseLegallyDivorced" },
            { Text: "Souse FatherName", value: "SouseFatherName" },
            { Text: "Spouse FatherSurname", value: "SpouseFatherSurname" },
            { Text: "Spouse about previous marriage", value: "Spouseaboutpreviousmarriage" },
            { Text: "Spouse familyPlaning", value: "SpousefamilyPlaning" },
            { Text: "Sspouse NoOfChildrens", value: "SspouseNoOfChildrens" },
            { Text: "RefName", value: "RefName" },
            { Text: "RefSurname", value: "RefSurname" },
            { Text: "Refprofession", value: "Refprofession" },
            { Text: "Refcountry", value: "Refcountry" },
            { Text: "RefState", value: "RefState" },
            { Text: "RefDistrict", value: "RefDistrict" },
            { Text: "RefNativePlace", value: "RefNativePlace" },
            { Text: "RefPresentLocation", value: "RefPresentLocation" },
            { Text: "RefMobile", value: "RefMobile" },
            { Text: "Refland Line", value: "ReflandLine" },
            { Text: "RefEmail", value: "RefEmail" },
            { Text: "RefNarration", value: "RefNarration" },
            { Text: "Pr_Age_fr", value: "Pr_Age_fr" },
            { Text: "Pr_Age_to", value: "Pr_Age_to" },
            { Text: "Pr_Hight_fr", value: "Pr_Hight_fr" },
            { Text: "Pr_Hight_to", value: "Pr_Hight_to" },
            { Text: "Pr_MotherTongue", value: "Pr_MotherTongue" },
            { Text: "Pr_Religion", value: "Pr_Religion" },
            { Text: "Pr_Caste", value: "Pr_Caste" },
            { Text: "Pr_SubCaste", value: "Pr_SubCaste" },
            { Text: "Pr_MaritalStatus", value: "Pr_MaritalStatus" },
            { Text: "Pr_Education", value: "Pr_Education" },
            { Text: "Pr_Profession", value: "Pr_Profession" },
            { Text: "Pr_Mangalic", value: "Pr_Mangalic" },
            { Text: "Pr_StarLanguage", value: "Pr_StarLanguage" },
            { Text: "Pr_NonPreferredStar", value: "Pr_NonPreferredStar" },
            { Text: "Pr_Diet", value: "Pr_Diet" },
            { Text: "Pr_PreferredCountry", value: "Pr_PreferredCountry" },
            { Text: "Pr_PreferredStat", value: "Pr_PreferredStat" },
            { Text: "Pr_Region", value: "Pr_Region" },
            { Text: "Pr_Branch", value: "Pr_Branch" },
            { Text: "contact address all", value: "CContactAddress_All" },
        ];
        model.checkTxt = function(val) {
            return val !== '' && val !== undefined && val !== null ? true : false;
        };
        model.displayArrayprofile = function(arr, topage) {
            // model.slide.headervisileble = true;
            var array = [];
            _.each(arr, function(item) {
                var data = [];
                data.push({
                    label: 'ProfileID',
                    value: '',
                    ProfileID: item.ProfileID,
                    KMPLID: item.KMPLID,
                    paid: item.paid === false || item.paid === 0 || item.paid === '0' ? '0' : '1',
                    IsConfidential: item.IsConfidential,
                    SuperConfidentila: item.SuperConfidentila,
                    HoroscopeStatus: item.HoroscopeStatus,
                    HoroscopeImage: item.HoroScopeImage
                });
                data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                data.push({ label: 'DOB-Height', value: '', DOB: item.DOB + ' -- ' + item.Height });
                data.push({ label: 'Caste', value: item.MotherTongue + "-" + item.Caste });
                data.push({ label: 'Dor', value: item.DOR });
                data.push({ label: 'Profile Grade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                array.push({
                    itmArr: data,
                    custPhoto: item.CustomerApplicationPhoto,
                    Custid: item.Cust_ID,
                    lastlogin: item.LastLoginDate,
                    logincount: item.LoginCount,
                    matkteingticket: item.TicketID,
                    matchmarktingcount: item.MatchMeetingCount,
                    ownername: item.ProfileOwnername,
                    reg: item.DOR,
                    branch: item.KMPLID,
                    SAForm: item.SAForm,
                    primarynumber: item.Primarynumber,
                    primaryemail: item.Primaryemail,
                    CreatedDate: item.CreatedDate,
                    SRCount: item.SRCount,
                    PaidAmount: item.Payment,
                    ExpiryDate: item.ExpiryDate,
                    Points: item.Points,
                    mobilestatus: item.CNumberVerStatus,
                    emailstatus: item.CEmailVerStatus,
                    UserName: item.EmpUserName,
                    Reason4InActive: item.Reason4InActive,
                    ProfileID: item.ProfileID,
                    CountryCodeID: item.CountryCodeID,
                    Cust_Family_ID: item.Cust_Family_ID,
                    PhotoCount: item.PhotoCount,
                    Age: item.Age,
                    HeightInCentimeters: item.HeightInCentimeters,
                    MaritalStatusID: item.MaritalStatusID,
                    CasteID: item.CasteID,
                    Tickets: item.Tickets,
                    TicketID: item.Emp_Ticket_ID,
                    onlinepaidcls: item.onlinepaidcls,
                    onlinepaid: item.onlinepaid,
                    educationspecialisation: item.EducationGroup,
                    currency: item.currency,
                    UploadedPhotoscount: item.UploadedPhotoscount,
                    TOB: item.TOB,
                    SubCaste: item.SubCaste,
                    Star: item.Star,
                    Profession: item.Profession,
                    PlaceOfBirth: item.PlaceOfBirth,
                    MFNative: item.MFNative,
                    Servicedate: item.CreatedDate,
                    HoroscopePath: item.HoroscopePath,
                    LastModifiedDate: item.LastModifiedDate,
                    TicketHisUpdatedDate: item.TicketHisUpdatedDate,
                    TicketOwner: item.TicketOwner,
                    Ticketuserid: item.Ticketuserid,
                    CountryCode: item.CountryCode,
                    PrimaryContact: item.PrimaryContact,
                    PriWithoutCode: item.PriWithoutCode,
                    paidclass: item.paid === true || item.paid === 1 ? 1 : 0,
                    Date: moment(item.Date).format('DD-MMM-YYYY')
                });
            });
            return array;
        };

        model.ViewProfile = function(row) {
            window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
        };

        model.ProfileIdTemplateDUrl = function(row) {
            var paidstatusclass = row.paid === 1 ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>";
            return paid;
        };
        model.Dobagetext = function(row) {
            var Age = "<p>" + row.DOB + "(" + row.Age + ")" + "</p>";
            return Age;
        };
        model.mothertongueandcaste = function(row) {
            var caste = "<p>" + row.MotherTongue + "-" + row.Caste + "</p>";
            return caste;
        };
        model.returnstringvalue = function(value) {
            var valuetext = value !== null && value !== undefined && value !== "" ? "<p>" + value + "</p>" : "--";
            return valuetext;
        };
        model.EducationGroupvalue = function(row) {
            var EducationGroup = model.returnstringvalue(row.EducationGroup);
            return EducationGroup;
        };
        model.Professionvalue = function(row) {
            var Professionvalue = model.returnstringvalue(row.Profession);
            return Professionvalue;
        };
        model.JobLocationvalue = function(row) {
            var JobLocationvalue = model.returnstringvalue(row.JobLocation);
            return JobLocationvalue;
        };
        model.propertyvalue = function(row) {
            var propertyvalue = model.returnstringvalue(row.Property);
            return propertyvalue;
        };
        model.CompanyNameyvalue = function(row) {
            var CompanyNameyvalue = model.returnstringvalue(row.CompanyName);
            return CompanyNameyvalue;
        };
        model.PlaceOfBirthvalue = function(row) {
            var PlaceOfBirthvalue = model.returnstringvalue(row.PlaceOfBirth);
            return PlaceOfBirthvalue;
        };
        model.TOBvalue = function(row) {
            var TOBvalue = model.returnstringvalue(row.TOB);
            return TOBvalue;
        };
        model.Gothramvalue = function(row) {
            var Gothramvalue = model.returnstringvalue(row.Gothram);
            return Gothramvalue;
        };
        model.Starvalue = function(row) {
            var Starvalue = model.returnstringvalue(row.Star);
            return Starvalue;
        };
        model.FFNativevalue = function(row) {
            var FFNativevalue = model.returnstringvalue(row.FFNative);
            return FFNativevalue;
        };
        model.MFNativevalue = function(row) {
            var MFNative = model.returnstringvalue(row.MFNative);
            return MFNative;
        };
        model.grid.columns = [
            { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
            { text: 'FirstName', key: 'FirstName', type: 'label' },
            { text: 'SurName', key: 'LastName', type: 'label' },
            { text: 'DOB', key: 'DOB', type: 'morelinks', templateUrl: model.Dobagetext },
            { text: 'Height', key: 'Height', type: 'label' },
            { text: 'Caste', key: 'Caste', type: 'morelinks', templateUrl: model.mothertongueandcaste },
            { text: 'Education', key: 'EducationGroup', type: 'morelinks', templateUrl: model.EducationGroupvalue },
            { text: 'Profession', key: 'Profession', type: 'morelinks', templateUrl: model.Professionvalue },
            { text: 'JobLocation', key: 'JobLocation', type: 'morelinks', templateUrl: model.JobLocationvalue },
            { text: 'Property', key: 'Property', type: 'morelinks', templateUrl: model.propertyvalue },
            { text: 'companyname', key: 'CompanyName', type: 'morelinks', templateUrl: model.CompanyNameyvalue },
            { text: 'PlaceOfBirth', key: 'PlaceOfBirth', type: 'morelinks', templateUrl: model.PlaceOfBirthvalue },
            { text: 'TOB', key: 'TOB', type: 'morelinks', templateUrl: model.TOBvalue },
            { text: 'Gothram', key: 'Gothram', type: 'morelinks', templateUrl: model.Gothramvalue },
            { text: 'Star', key: 'Star', type: 'morelinks', templateUrl: model.Starvalue },
            { text: 'FFNative', key: 'FFNative', type: 'morelinks', templateUrl: model.FFNativevalue },
            { text: 'MFNative', key: 'MFNative', type: 'morelinks', templateUrl: model.MFNativevalue }
        ];
        model.MyProfilePageLoad = function() {
            helperservice.getMyprofilebind(1, 2, '').then(function(response) {
                model.Applicationstatusarray = [];
                model.Castearray = [];
                model.maritalstatusarray = [];
                model.maritalstatusarray = arrayConstants.MaritalStatusreg;
                _.each(response.data, function(item) {
                    switch (item.CountryCode) {
                        case "Application Status":
                            model.Applicationstatusarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            break;
                        case "Caste":
                            model.Castearray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            break;
                    }
                });
            });
        };
        ///
        model.returnnullvalue = function(value) {
            var obj = helperservice.checkstringvalue(value) && (value.toString()) !== "0" && (value.toString()) !== 0 ? (value.toString()) : null;
            return obj;
        };
        model.rowStyle = function(row) {
            var test = [
                { StatusID: 57, classes: 'settled' },
                { StatusID: 393, classes: 'settled' },
                { StatusID: 56, classes: 'Deleted' },
                { StatusID: 394, classes: 'Deleted' },
                { StatusID: 258, classes: 'closed' }
            ];

            return _.where(test, { StatusID: parseInt(row.ProfileStatusID) }).length > 0 ? _.where(test, { StatusID: parseInt(row.ProfileStatusID) })[0].classes : '';
        };
        model.keywordlikesearch = function(from, to, type, flagtypeofsearch) {
            if (from === 1) {
                model.flagtypeofsearch = flagtypeofsearch;
            }
            if (model.flagtypeofsearch === 'all') {
                model.topage = to;
                if (model.checkInputs()) {
                    model.object.Keyworddlikesrch.AllContactNo = model.allphones !== null && model.allphones !== "" && model.allphones !== undefined ? model.allphones : null;
                    model.object.Keyworddlikesrch.AllEmails = model.allemails !== null && model.allemails !== "" && model.allemails !== undefined ? model.allemails : null;
                    model.object.Keyworddlikesrch.AllSurNames = model.allsurnames !== null && model.allsurnames !== "" && model.allsurnames !== undefined ? model.allsurnames : null;
                    model.object.Keyworddlikesrch.AllNatives = model.allnativeplaces !== null && model.allnativeplaces !== "" && model.allnativeplaces !== undefined ? model.allnativeplaces : null;
                    model.object.Keyworddlikesrch.CEducationAll = model.allEducation;
                    model.object.Keyworddlikesrch.CProfAll = model.allProfession;
                    model.object.Keyworddlikesrch.FAllFields = model.allFather;
                    model.object.Keyworddlikesrch.MAllFields = model.allMother;
                    model.object.Keyworddlikesrch.Br_AllFields = model.allBrother;
                    model.object.Keyworddlikesrch.Sr_AllFields = model.allSister;
                    // model.object.Keyworddlikesrch.FB_AllFields = model.allFB;
                    // model.object.Keyworddlikesrch.FS_AllFields = model.allFS;
                    // model.object.Keyworddlikesrch.MB_AllFields = model.allMB;
                    // model.object.Keyworddlikesrch.MS_AllFields = model.allMS;
                    model.object.Keyworddlikesrch.CAll = model.c_all;
                    model.object.Keyworddlikesrch.Gender = model.rbtnGender ? model.rbtnGender : null;
                    model.object.Keyworddlikesrch.ApplicationStatus = model.returnnullvalue(model.applicationids);
                    model.object.Keyworddlikesrch.startindex = from;
                    model.object.Keyworddlikesrch.EndIndex = to;
                    model.object.Keyworddlikesrch.EmpID = model.empid;
                    keywordSearchService.keywordlikesearch(model.object.Keyworddlikesrch).then(function(response) {
                        if (_.isArray(response.data) && response.data.length > 0 && _.isArray(response.data[0]) && response.data[0].length) {
                            if (type === 'grid') {
                                model.panelbodyhide = false;
                                model.grid.showpaging = true;
                                model.keywordcontrols = true;
                                model.btnbacktosearch = true;
                                model.grid.pageSize = 10;
                                _.map(response.data[0], function(item) {
                                    item.rowtype = model.rowStyle(item);
                                });
                                model.grid.TotalRows = response.data[0][0].TotalRows;
                                model.grid.data = response.data[0];
                            } else if (type === 'excel') {
                                model.grid.exportarray = [];
                                model.grid.exportarray = response.data[0];
                                var options = {
                                    headers: true,
                                    columns: [{
                                            columnid: 'ProfileID',
                                            title: 'ProfileID'
                                        }, {
                                            columnid: 'FirstName',
                                            title: 'FirstName'
                                        }, {
                                            columnid: 'LastName',
                                            title: 'SurName'
                                        },
                                        {
                                            columnid: 'Caste',
                                            title: 'Caste'
                                        },
                                        {
                                            columnid: 'EducationGroup',
                                            title: 'Education'
                                        },
                                        {
                                            columnid: 'Profession',
                                            title: 'Profession'
                                        },
                                        {
                                            columnid: 'JobLocation',
                                            title: 'JobLocation'
                                        },
                                        {
                                            columnid: 'Property',
                                            title: 'Property'
                                        },
                                        {
                                            columnid: 'CompanyName',
                                            title: 'CompanyName'
                                        },
                                        {
                                            columnid: 'PlaceOfBirth',
                                            title: 'PlaceOfBirth'
                                        },
                                        {
                                            columnid: 'TOB',
                                            title: 'TOB'
                                        },
                                        {
                                            columnid: 'Gothram',
                                            title: 'Gothram'
                                        },
                                        {
                                            columnid: 'Star',
                                            title: 'Star'
                                        },
                                        {
                                            columnid: 'FFNative',
                                            title: 'FFNative'
                                        },
                                        {
                                            columnid: 'MFNative',
                                            title: 'MFNative'
                                        }
                                    ]
                                };
                                alasql('SELECT ProfileID,FirstName,LastName as SurName,Caste,EducationGroup as Education,Profession,JobLocation,Property,CompanyName,PlaceOfBirth,TOB,Gothram,Star,FFNative,MFNative  INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.grid.exportarray]);
                            } else {
                                model.slide.totalRecords = response.data[0][0].TotalRows;
                                model.slide.headervisileble = true;
                                if (parseInt(from) === 1) {
                                    configslide.setSlides(model.displayArrayprofile(response.data[0], 10), 10, 'normal');
                                    if (model.myprofileslideshowopenflag !== 1) {
                                        model.myprofileslideshowopenflag = 1;
                                        modelpopupopenmethod.showPopup('keywordlikesearch.html', model.scope, 'lg', "myprofileslide");
                                    }
                                } else {
                                    configslide.addSlides(model.displayArrayprofile(response.data[0], 11), configslide.slides, parseInt(to), 'normal');
                                }
                            }
                        } else {
                            if (type === 'grid') {
                                model.grid.data = [];
                                model.grid.showpaging = false;
                                model.panelbodyhide = true;
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No Records Found', 4500);
                            }
                        }
                    });
                } else {
                    model.isDisabledsubmit = false;
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter atleast one field', 4500);
                }
            } else {
                model.keywordlikesearchforlist(from, to, type);
            }
        };
        ////
        model.returnnullvalue = function(value) {
            var obj = helperservice.checkstringvalue(value) && (value.toString()) !== "0" && (value.toString()) !== 0 ? (value.toString()) : null;
            return obj;
        };
        model.keywordlikesearchforlist = function(from, to, type) {
            model.topage = to;
            if (from === 1) {
                model.object.Keyworddlikesrch = {};
                if (model.txtallkeywordsearh !== "" && model.txtallkeywordsearh !== undefined && model.txtallkeywordsearh !== null) {
                    model.Getfilterobject();
                }
            }
            model.object.Keyworddlikesrch.ApplicationStatus = model.returnnullvalue(model.applicationids);
            model.object.Keyworddlikesrch.EmpID = parseInt(model.empid);
            model.object.Keyworddlikesrch.startindex = from;
            model.object.Keyworddlikesrch.EndIndex = to;
            model.object.Keyworddlikesrch.Gender = model.rbtnGender !== "" && model.rbtnGender !== undefined && model.rbtnGender !== null ? parseInt(model.rbtnGender) : null;
            model.object.Keyworddlikesrch.maritalstatus = model.returnnullvalue(model.maritalstatusids);
            model.object.Keyworddlikesrch.FromAge = model.txtfromagekey !== "" && model.txtfromagekey !== undefined && model.txtfromagekey !== null ? parseInt(model.txtfromagekey) : null;
            model.object.Keyworddlikesrch.ToAge = model.txttoagekey !== "" && model.txttoagekey !== undefined && model.txttoagekey !== null ? parseInt(model.txttoagekey) : null;
            model.object.Keyworddlikesrch.FromHeight = model.txtfromheightkey !== "" && model.txtfromheightkey !== undefined && model.txtfromheightkey !== null ? parseInt(model.txtfromheightkey) : null;
            model.object.Keyworddlikesrch.ToHeight = model.txttoheightkey !== "" && model.txttoheightkey !== undefined && model.txttoheightkey !== null ? parseInt(model.txttoheightkey) : null;
            model.object.Keyworddlikesrch.Caste = model.returnnullvalue(model.Casteids);
            model.object.Keyworddlikesrch.CDomicile = model.rbtndomacile !== "" && model.rbtndomacile !== undefined && model.rbtndomacile !== null ? parseInt(model.rbtndomacile) : null;
            keywordSearchService.KeywordlikeSearchnewpage(model.object.Keyworddlikesrch).then(function(response) {
                console.log(response.data);
                if (_.isArray(response.data) && response.data.length > 0) {
                    if (type === 'grid') {
                        if (from === 1) {
                            model.controllistbox = false;
                        }
                        model.panelbodyhide = false;
                        model.grid.showpaging = true;
                        model.keywordcontrols = true;
                        model.btnbacktosearch = true;
                        model.grid.pageSize = 10;
                        _.map(response.data, function(item) {
                            item.rowtype = model.rowStyle(item);
                        });
                        model.grid.TotalRows = response.data[0].TotalRows;
                        model.grid.data = response.data;
                    } else if (type === 'excel') {
                        model.grid.exportarray = [];
                        model.grid.exportarray = response.data;
                        var options = {
                            headers: true,
                            columns: [{
                                    columnid: 'ProfileID',
                                    title: 'ProfileID'
                                }, {
                                    columnid: 'FirstName',
                                    title: 'FirstName'
                                }, {
                                    columnid: 'LastName',
                                    title: 'SurName'
                                },
                                {
                                    columnid: 'Caste',
                                    title: 'Caste'
                                },
                                {
                                    columnid: 'EducationGroup',
                                    title: 'Education'
                                },
                                {
                                    columnid: 'Profession',
                                    title: 'Profession'
                                },
                                {
                                    columnid: 'JobLocation',
                                    title: 'JobLocation'
                                },
                                {
                                    columnid: 'Property',
                                    title: 'Property'
                                },
                                {
                                    columnid: 'CompanyName',
                                    title: 'CompanyName'
                                },
                                {
                                    columnid: 'PlaceOfBirth',
                                    title: 'PlaceOfBirth'
                                },
                                {
                                    columnid: 'TOB',
                                    title: 'TOB'
                                },
                                {
                                    columnid: 'Gothram',
                                    title: 'Gothram'
                                },
                                {
                                    columnid: 'Star',
                                    title: 'Star'
                                },
                                {
                                    columnid: 'FFNative',
                                    title: 'FFNative'
                                },
                                {
                                    columnid: 'MFNative',
                                    title: 'MFNative'
                                }
                            ]
                        };
                        alasql('SELECT ProfileID,FirstName,LastName as SurName,Caste,EducationGroup as Education,Profession,JobLocation,Property,CompanyName,PlaceOfBirth,TOB,Gothram,Star,FFNative,MFNative  INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.grid.exportarray]);
                    } else {
                        model.slide.totalRecords = response.data[0].TotalRows;
                        model.slide.headervisileble = true;
                        if (parseInt(from) === 1) {
                            configslide.setSlides(model.displayArrayprofile(response.data, 10), 10, 'normal');
                            if (model.myprofileslideshowopenflag !== 1) {
                                model.myprofileslideshowopenflag = 1;
                                modelpopupopenmethod.showPopup('keywordlikesearch.html', model.scope, 'lg', "myprofileslide");
                            }
                        } else {
                            configslide.addSlides(model.displayArrayprofile(response.data, 11), configslide.slides, parseInt(to), 'normal');
                        }
                    }
                } else {
                    if (type === 'grid') {
                        model.grid.data = [];
                        model.grid.showpaging = false;
                        model.panelbodyhide = true;
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No Records Found', 4500);
                    }
                }
            });
        };
        model.checkInputs = function() {
            var inputArray = ['allphones', 'allemails', 'allsurnames', 'allnativeplaces', 'allEducation',
                'allProfession', 'allFather', 'allMother', 'allBrother', 'allSister', 'c_all'
            ];
            var count = 0;
            _.each(inputArray, function(item) {
                if (model.checkTxt(model[item])) {
                    count++;
                }
            });
            if (count > 0) {
                return true;
            } else {
                return false;
            }
        };

        model.slide.closemainpopup = function() {
            model.myprofileslideshowopenflag = 0;
            modelpopupopenmethod.closepopup();
        };
        model.grid.pagechange = function(val) {
            var to = val * 100;
            var from = val === 1 ? 1 : to - 99;
            model.keywordlikesearch(from, to, 'grid');
        };
        model.grid.exportexcel = function(topage) {
            model.keywordlikesearch(1, topage, 'excel');
        };
        model.close = function() {
            modelpopupopenmethod.closepopup();
        };
        model.closepopup = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        model.slide.slidebind = function(old, news, array) {
            if (parseInt(model.topage) - parseInt(news) === 4) {
                model.keywordlikesearch((model.topage) + 1, (model.topage) + 10, 'slide');
            }
        };
        model.bindSlide = function() {
            model.keywordlikesearch(1, 10, 'slide');
        };
        model.slide.tickethistorypopup = function(TicketID) {
            model.marketingTicketid = TicketID;
            modelpopupopenmethod.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");
        };
        model.resetkeyword = function() {
            var inputArray = ['allphones', 'allemails', 'allsurnames', 'allnativeplaces', 'allEducation',
                'allProfession', 'allFather', 'allMother', 'allBrother', 'allSister', 'c_all'
            ];
            inputArray.forEach(function(element) {
                model[element] = '';
            }, this);
            model.applicationids = [54];
            model.txtallkeywordsearh = '';
        };
        model.onchangeselectlistvalues = function(value) {
            var optionSelected = $.trim(value);
            console.log(optionSelected);
            var entertext;
            if (optionSelected === "CDateofReg" || optionSelected === "Salary" || optionSelected === "workingfromdate" || optionSelected === "PropertyValue") {
                if (model.txtallkeywordsearh === "") {
                    entertext = "" + optionSelected + " between ' , '";
                } else {
                    entertext = "  and  " + optionSelected + " between ' , '";
                }
            } else {
                if (model.txtallkeywordsearh === "") {
                    entertext = "" + optionSelected + " like '%%'";
                } else {
                    entertext = "  and  " + optionSelected + " like '%%'";
                }
            }
            var strSearchText = entertext;
            model.txtallkeywordsearh = model.txtallkeywordsearh + strSearchText;
        };
        model.Getfilterobject = function() {
            _.each(model.txtallkeywordsearh.split(' and '), function(item) {
                var innerdata = item.indexOf("between") != -1 ? item.split('between') : item.split('like');
                model.object.Keyworddlikesrch[_.where(model.Searchfields, { Text: (innerdata[0]).trim() })[0].value] = (innerdata[1]).trim();
            });
            console.log((model.object.Keyworddlikesrch));
            return model.object;
        };
        return model;
    }
})();