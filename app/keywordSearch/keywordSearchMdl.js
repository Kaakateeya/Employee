(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('keywordSearchModel', factory);
    factory.$inject = ['keywordSearchService', 'complex-grid-config', 'complex-slide-config',
        'modelpopupopenmethod', 'helperservice', 'alert', 'arrayConstants', '$timeout'
    ];

    function factory(keywordSearchService, configgrid, configslide, modelpopupopenmethod, helperservice,
        alertss, arrayConstants, timeout) {
        var model = {};
        model.slide = {};
        model.grid = {};
        model.slide.config = configslide;
        model.slide.config.dobshow = true;
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
            { Text: "CAboutMe", value: "CAboutMe", style: 'redcolor' },
            { Text: "CAboutFamily", value: "CAboutFamily", style: 'redcolor' },
            { Text: "CBornCitigen", value: "CBornCitigen", style: 'redcolor' },
            { Text: "CBodyType", value: "CBodyType", style: 'redcolor' },
            { Text: "CBranch", value: "CBranch", style: 'redcolor' },
            { Text: "CColor", value: "CColor", style: 'redcolor' },
            { Text: "CCountryOfBirth", value: "CCountryOfBirth", style: 'redcolor' },
            { Text: "CStateOfBirth", value: "CStateOfBirth", style: 'redcolor' },
            { Text: "CDistrictOfBirth", value: "CDistrictOfBirth", style: 'redcolor' },
            { Text: "CCountry Working", value: "countryworking", style: 'redcolor' },
            { Text: "CState Working", value: "stateworking", style: 'redcolor' },
            { Text: "CDistrict Working", value: "districtworking", style: 'redcolor' },
            { Text: "CCity Working", value: "cityworking", style: 'redcolor' },
            { Text: "CCityOfBirth", value: "CCityOfBirth", style: 'redcolor' },
            { Text: "CDOB", value: "CDOB", style: 'redcolor', toolTip: 'DD-MM-YYYY' },
            { Text: "CDrink", value: "CDrink", style: 'redcolor' },
            { Text: "CDiet", value: "CDiet", style: 'redcolor' },
            { Text: "CDateofReg", value: "CDateofReg", style: 'redcolor', toolTip: 'DD-MM-YYYY' },
            { Text: "CEdu category", value: "CEducationCategory", style: 'redcolor' },
            { Text: "CEducation", value: "CEduGroup", style: 'redcolor' },
            { Text: "CEdu Specialization", value: "CEduSplecialization", style: 'redcolor' },
            { Text: "CUniversity", value: "CEduUniversity", style: 'redcolor' },
            { Text: "CCollege", value: "CEduCollege", style: 'redcolor' },
            { Text: "CEdu country", value: "CEduCountry", style: 'redcolor' },
            { Text: "CEdu state", value: "CEduState", style: 'redcolor' },
            { Text: "CEdu district", value: "CEduDistrict", style: 'redcolor' },
            { Text: "CEdu city", value: "CEduCity", style: 'redcolor' },
            { Text: "CEdu merits", value: "CEduMerits", style: 'redcolor' },
            { Text: "CEdupass of year", value: "CEduPass_Year", style: 'redcolor' },
            { Text: "CEmployeed In", value: "EmployeedIn", style: 'redcolor' },
            { Text: "CEducationGrade", value: "CEducationGrade", style: 'redcolor' },
            { Text: "CFamilyGrade", value: "CFamilyGrade", style: 'redcolor' },
            { Text: "Name", value: "CFName", style: 'redcolor' },
            { Text: "SurName", value: "CLName", style: 'redcolor' },
            { Text: "CProfessional Group", value: "Professionalgroup", style: 'redcolor' },
            { Text: "CProfession", value: "Profession", style: 'redcolor' },
            { Text: "CProfession Details", value: "professionDetails", style: 'redcolor' },
            { Text: "CProfessionStatus", value: "CProfessionStatus", style: 'redcolor' },
            { Text: "CCompany Name", value: "Companyname", style: 'redcolor' },
            { Text: "CMonthly Salary", value: "monthlysalary", style: 'redcolor' },
            { Text: "CWorking From Date", value: "workingfromdate", style: 'redcolor' },
            { Text: "CpropertyType", value: "CpropertyType", style: 'redcolor' },
            { Text: "CPropertyValue", value: "CPropertyValue", style: 'redcolor' },
            { Text: "CPropertyDescription", value: "CPropertyDescription", style: 'redcolor' },
            { Text: "CPhysicalStatus", value: "CPhysicalStatus", style: 'redcolor' },
            { Text: "CParentCaste", value: "CParentCaste", style: 'redcolor' },
            { Text: "CPropertyGrade", value: "CPropertyGrade", style: 'redcolor' },
            { Text: "CPhotoGrade", value: "CPhotoGrade", style: 'redcolor' },
            { Text: "CPaadam", value: "CPaadam", style: 'redcolor' },
            { Text: "CRelision", value: "CRelision", style: 'redcolor' },
            { Text: "CRegStatus", value: "CRegStatus", style: 'redcolor' },
            { Text: "CSmoke", value: "CSmoke", style: 'redcolor' },
            { Text: "CStarLanguage", value: "CStarLanguage", style: 'redcolor' },
            { Text: "CStar", value: "CStar", style: 'redcolor' },
            { Text: "CRaasi", value: "CRaasi", style: 'redcolor' },
            { Text: "CLagnam", value: "CLagnam", style: 'redcolor' },
            { Text: "CGothram", value: "CGothram", style: 'redcolor' },
            { Text: "CMaternalGothram", value: "CMaternalGothram", style: 'redcolor' },
            { Text: "CMotherTongue", value: "CMotherTongue", style: 'redcolor' },
            { Text: "CKujadosham", value: "CKujadosham", style: 'redcolor' },
            { Text: "CWebsiteStatus", value: "CWebsiteStatus", style: 'redcolorborder' },
            //father
            { Text: "FName", value: "FFirstName", style: 'lightbluecolor' },
            { Text: "FEducation", value: "FEducationDetails", style: 'lightbluecolor' },
            { Text: "FProfession", value: "FProfessionDetails", style: 'lightbluecolor' },
            { Text: "Fcompany Name", value: "FCompanyId", style: 'lightbluecolor' },
            { Text: "Fjob Location", value: "FJobLocation", style: 'lightbluecolor' },
            { Text: "FMobile/LandLine", value: "FNumber", style: 'lightbluecolor' },
            { Text: "FEmail", value: "Femail", style: 'lightbluecolor' },
            { Text: "FFName", value: "FFatherName", style: 'lightbluecolor' },
            { Text: "FFmobile/Landline", value: "FFatherContactNumber", style: 'lightbluecolor' },
            { Text: "FFstate", value: "FFStateName", style: 'lightbluecolor' },
            { Text: "FFDistrict", value: "FFDistrictName", style: 'lightbluecolor' },
            { Text: "FFNative Place", value: "FFNativePlace", style: 'lightbluecolorborder' },
            //mother
            { Text: "Mother Name", value: "MFirstName", style: 'darkblue' },
            { Text: "M LastName", value: "MLastName", style: 'darkblue' },
            { Text: "MEducation", value: "MEducationDetails", style: 'darkblue' },
            { Text: "Mprofession", value: "MProfessionDetails", style: 'darkblue' },
            { Text: "Mcompany Name", value: "MCompanyId", style: 'darkblue' },
            { Text: "MJob location", value: "MJobLocation", style: 'darkblue' },
            { Text: "MMobile/Land Line", value: "MNumber", style: 'darkblue' },
            { Text: "MEmail", value: "Memail", style: 'darkblue' },
            { Text: "MFName", value: "MFatherFirstName", style: 'darkblue' },
            { Text: "MFSurName", value: "MFatherLastName", style: 'darkblue' },
            { Text: "MFmobile/Land", value: "MFatherContactNumber", style: 'darkblue' },
            { Text: "MFState", value: "MFStateName", style: 'darkblue' },
            { Text: "MFDistrict", value: "MFDistrictName", style: 'darkblue' },
            { Text: "MFNative Place", value: "MFNativePlace", style: 'darkblueboder' },
            //Brother
            { Text: "CBname", value: "Br_Name", style: 'lightgreen' },
            { Text: "CBeducation", value: "Br_Education", style: 'lightgreen' },
            { Text: "CBprofession", value: "Br_Profession", style: 'lightgreen' },
            { Text: "CBcompany", value: "Br_CompanyNAME", style: 'lightgreen' },
            { Text: "CBjoblocation", value: "Br_Joblocation", style: 'lightgreen' },
            { Text: "CBMobile/land", value: "BrContactNo", style: 'lightgreen' },
            { Text: "CBemail", value: "Br_Email", style: 'lightgreen' },
            { Text: "CBWname", value: "Brw_Name", style: 'lightgreen' },
            { Text: "CBWeducation", value: "Brw_Education", style: 'lightgreen' },
            { Text: "CBWprofession", value: "Brw_Profession", style: 'lightgreen' },
            { Text: "CBWcompany Name", value: "Brw_CompanyNAME", style: 'lightgreen' },
            { Text: "CBWjob location", value: "Brw_Joblocation", style: 'lightgreen' },
            { Text: "CBWMobile/land", value: "BrwContactNo", style: 'lightgreen' },
            { Text: "CBWemail", value: "Brw_Email", style: 'lightgreen' },
            { Text: "CBWFSurname", value: "Brwf_Surname", style: 'lightgreen' },
            { Text: "CBWFName", value: "Brwf_Name", style: 'lightgreen' },
            { Text: "CBWFState", value: "BrwfStateName", style: 'lightgreen' },
            { Text: "CBWFdistrict", value: "BrwfDistrictName", style: 'lightgreen' },
            { Text: "CBWFNative Place", value: "BrwfCity", style: 'lightgreenborder' },
            //sister
            { Text: "CSName", value: "Sr_Name", style: 'lightbrown' },
            { Text: "CSeducation", value: "Sr_Education", style: 'lightbrown' },
            { Text: "CSprofession", value: "Sr_Profession", style: 'lightbrown' },
            { Text: "CScompany", value: "Sr_CompanyNAME", style: 'lightbrown' },
            { Text: "CSjoblocation", value: "Sr_Joblocation", style: 'lightbrown' },
            { Text: "CSMobile/Land", value: "SrContactNo", style: 'lightbrown' },
            { Text: "CSemail", value: "Sr_Email", style: 'lightbrown' },
            { Text: "CSHName", value: "Srh_Name", style: 'lightbrown' },
            { Text: "CSHeducation", value: "Srh_Education", style: 'lightbrown' },
            { Text: "CSHprofession", value: "Srh_Profession", style: 'lightbrown' },
            { Text: "CSHcompany Name", value: "Srh_CompanyNAME", style: 'lightbrown' },
            { Text: "CSHjob location", value: "Srh_Joblocation", style: 'lightbrown' },
            { Text: "CSHMobile/land", value: "SrhContactNo", style: 'lightbrown' },
            { Text: "CSHemail", value: "Srh_Email", style: 'lightbrown' },
            { Text: "CSHFSurname", value: "Srhf_Surname", style: 'lightbrown' },
            { Text: "CSHFName", value: "Srhf_Name", style: 'lightbrown' },
            { Text: "CSHFstate", value: "SrhfStateName", style: 'lightbrown' },
            { Text: "CSHFdistrict", value: "SrhfDistrictName", style: 'lightbrown' },
            { Text: "CSHFNative Place", value: "SrhfCity", style: 'lightbrownborder' },
            //father brother
            { Text: "Father Brother All", value: "FB_AllFields", style: 'tealcolor' },
            { Text: "FB(E/Y)", value: "FB_ElderYounger", style: 'tealcolor' },
            { Text: "FBName", value: "FB_Name", style: 'tealcolor' },
            { Text: "FBEducation", value: "FB_Education", style: 'tealcolor' },
            { Text: "FBProfession", value: "FB_Profession", style: 'tealcolor' },
            { Text: "FBMobile/land", value: "FB_Contactnumber", style: 'tealcolor' },
            { Text: "FBEmail", value: "FB_Email", style: 'tealcolor' },
            { Text: "FBCurrent Location", value: "FB_professionlocation", style: 'tealcolorborder' },
            //father sister
            { Text: "Father Sister All", value: "FS_AllFields", style: 'purplecolor' },
            { Text: "FSName", value: "FS_Name", style: 'purplecolor' },
            { Text: "FSHName", value: "FSH_Name", style: 'purplecolor' },
            { Text: "FSHSur Name", value: "FSH_Surname", style: 'purplecolor' },
            { Text: "FSHEducation", value: "FSH_Education", style: 'purplecolor' },
            { Text: "FSHProfession", value: "FSH_Profession", style: 'purplecolor' },
            { Text: "FSHMobile/Land", value: "FSHContactNo", style: 'purplecolor' },
            { Text: "FSHEmail", value: "FSH_Email", style: 'purplecolor' },
            { Text: "FSHCurrent Location", value: "FSH_ProfessionLocation", style: 'purplecolor' },
            { Text: "FSHstate", value: "FSHStateName", style: 'purplecolor' },
            { Text: "FSHDistrict", value: "FSHDistrictName", style: 'purplecolor' },
            { Text: "FSHNative Place", value: "FSHCityName", style: 'purplecolorborder' },
            //Mother Brother 
            { Text: "Mother Brother All", value: "MB_AllFields", style: 'tomatocolor' },
            { Text: "MBName", value: "MB_Name", style: 'tomatocolor' },
            { Text: "MBEducation", value: "MB_Education", style: 'tomatocolor' },
            { Text: "MBProfession", value: "MB_Profession", style: 'tomatocolor' },
            { Text: "MBMobile/land", value: "MB_ContactNo", style: 'tomatocolor' },
            { Text: "MBEmail", value: "MB_Email", style: 'tomatocolor' },
            { Text: "MBCurrent Location", value: "MB_professionlocation", style: 'tomatocolorborder' },
            ///Mothrer sister
            { Text: "Mother Sister All", value: "MS_AllFields", style: 'slatebue' },
            { Text: "MSName", value: "MS_Name", style: 'slatebue' },
            { Text: "MSHName", value: "MSH_Name", style: 'slatebue' },
            { Text: "MSHSur Name", value: "MSH_Surname", style: 'slatebue' },
            { Text: "MSHEducation", value: "MSH_Education", style: 'slatebue' },
            { Text: "MSHProfession", value: "MSH_Profession", style: 'slatebue' },
            { Text: "MSHMobile/Land", value: "MSH_ContactNo", style: 'slatebue' },
            { Text: "MSHEmail", value: "MSH_Email", style: 'slatebue' },
            { Text: "MSHCurrent Location", value: "MSH_ProfessionLocation", style: 'slatebue' },
            { Text: "MSHstate", value: "MSHStateName", style: 'slatebue' },
            { Text: "MSHDistrict", value: "MSHDistrictName", style: 'slatebue' },
            { Text: "MSHNative Place", value: "MSHCityName", style: 'slatebueborder' },
            //spouse
            { Text: "SFName", value: "SFName", style: 'teallcolor' },
            { Text: "SLName", value: "SLName", style: 'teallcolor' },
            { Text: "Spouse Education", value: "SpouseEducation", style: 'teallcolor' },
            { Text: "Spouse Profession", value: " SpouseProfession", style: 'teallcolor' },
            { Text: "Spouse Married On", value: "SpouseMarriedOn", style: 'teallcolor' },
            { Text: "Spouse Separated Date", value: "SpouseSeparatedDate", style: 'teallcolor' },
            { Text: "Spouse Legally Divorced", value: "SpouseLegallyDivorced", style: 'teallcolor' },
            { Text: "Souse FatherName", value: "SouseFatherName", style: 'teallcolor' },
            { Text: "Spouse FatherSurname", value: "SpouseFatherSurname", style: 'teallcolor' },
            { Text: "Spouse about previous marriage", value: "Spouseaboutpreviousmarriage", style: 'teallcolor' },
            { Text: "Spouse familyPlaning", value: "SpousefamilyPlaning", style: 'teallcolor' },
            { Text: "Sspouse NoOfChildrens", value: "SspouseNoOfChildrens", style: 'teallcolorborder' },
            //ref
            { Text: "RefName", value: "RefName", style: 'olivedrabcolor' },
            { Text: "RefSurname", value: "RefSurname", style: 'olivedrabcolor' },
            { Text: "Refprofession", value: "Refprofession", style: 'olivedrabcolor' },
            { Text: "Refcountry", value: "Refcountry", style: 'olivedrabcolor' },
            { Text: "RefState", value: "RefState", style: 'olivedrabcolor' },
            { Text: "RefDistrict", value: "RefDistrict", style: 'olivedrabcolor' },
            { Text: "RefNativePlace", value: "RefNativePlace", style: 'olivedrabcolor' },
            { Text: "RefPresentLocation", value: "RefPresentLocation", style: 'olivedrabcolor' },
            { Text: "RefMobile", value: "RefMobile", style: 'olivedrabcolor' },
            { Text: "Refland Line", value: "ReflandLine", style: 'olivedrabcolor' },
            { Text: "RefEmail", value: "RefEmail", style: 'olivedrabcolor' },
            { Text: "RefNarration", value: "RefNarration", style: 'olivedrabcolorborder' },
            //partner
            { Text: "Pr_Age_fr", value: "Pr_Age_fr", style: 'salmoncolor' },
            { Text: "Pr_Age_to", value: "Pr_Age_to", style: 'salmoncolor' },
            { Text: "Pr_Hight_fr", value: "Pr_Hight_fr", style: 'salmoncolor' },
            { Text: "Pr_Hight_to", value: "Pr_Hight_to", style: 'salmoncolor' },
            { Text: "Pr_MotherTongue", value: "Pr_MotherTongue", style: 'salmoncolor' },
            { Text: "Pr_Religion", value: "Pr_Religion", style: 'salmoncolor' },
            { Text: "Pr_Caste", value: "Pr_Caste", style: 'salmoncolor' },
            { Text: "Pr_SubCaste", value: "Pr_SubCaste", style: 'salmoncolor' },
            { Text: "Pr_MaritalStatus", value: "Pr_MaritalStatus", style: 'salmoncolor' },
            { Text: "Pr_Education", value: "Pr_Education", style: 'salmoncolor' },
            { Text: "Pr_Profession", value: "Pr_Profession", style: 'salmoncolor' },
            { Text: "Pr_Mangalic", value: "Pr_Mangalic", style: 'salmoncolor' },
            { Text: "Pr_StarLanguage", value: "Pr_StarLanguage", style: 'salmoncolor' },
            { Text: "Pr_NonPreferredStar", value: "Pr_NonPreferredStar", style: 'salmoncolor' },
            { Text: "Pr_Diet", value: "Pr_Diet", style: 'salmoncolor' },
            { Text: "Pr_PreferredCountry", value: "Pr_PreferredCountry", style: 'salmoncolor' },
            { Text: "Pr_PreferredStat", value: "Pr_PreferredStat", style: 'salmoncolor' },
            { Text: "Pr_Region", value: "Pr_Region", style: 'salmoncolor' },
            { Text: "Pr_Branch", value: "Pr_Branch", style: 'salmoncolor' },
            { Text: "contact address all", value: "CContactAddress_All", style: 'salmoncolorborder' }
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
                data.push({ label: 'Dor', value: item.RegistrationDate });
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
                model.arraygender = [
                    { value: 2, name: 'Bride' },
                    { value: 1, name: 'Groom' }
                ];
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
        model.keywordlikesearch = function(from, to, type, flagtypeofsearch, btnsearch) {
            if (btnsearch === 'btnsearch') {
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
                    model.object.Keyworddlikesrch.Caste = model.returnnullvalue(model.casteidkey);
                    model.object.Keyworddlikesrch.Age = model.c_age;

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
            model.object.Keyworddlikesrch.Gender = model.returnnullvalue(model.rbtnGender);
            model.object.Keyworddlikesrch.maritalstatus = model.returnnullvalue(model.maritalstatusids);
            model.object.Keyworddlikesrch.FromAge = model.txtfromagekey !== "" && model.txtfromagekey !== undefined && model.txtfromagekey !== null ? parseInt(model.txtfromagekey) : null;
            model.object.Keyworddlikesrch.ToAge = model.txttoagekey !== "" && model.txttoagekey !== undefined && model.txttoagekey !== null ? parseInt(model.txttoagekey) : null;
            model.object.Keyworddlikesrch.FromHeight = model.txtfromheightkey !== "" && model.txtfromheightkey !== undefined && model.txtfromheightkey !== null ? parseInt(model.txtfromheightkey) : null;
            model.object.Keyworddlikesrch.ToHeight = model.txttoheightkey !== "" && model.txttoheightkey !== undefined && model.txttoheightkey !== null ? parseInt(model.txttoheightkey) : null;
            model.object.Keyworddlikesrch.Caste = model.returnnullvalue(model.Casteids);
            model.object.Keyworddlikesrch.CDomicile = model.rbtndomacile !== "" && model.rbtndomacile !== undefined && model.rbtndomacile !== null ? parseInt(model.rbtndomacile) : null;
            keywordSearchService.KeywordlikeSearchnewpage(model.object.Keyworddlikesrch).then(function(response) {
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
            model.txtallkeywordsearh = '';
            model.lblsearchedfields = '';
            model.rbtnGender = '';
            model.rbtndomacile = '';
            model.txtfromagekey = '';
            model.txttoagekey = '';
            model.txtfromheightkey = '';
            model.txttoheightkey = '';
            model.applicationids = [54];

            model.Casteids = undefined;
            model.casteidkey = undefined;
            model.maritalstatusids = undefined;
        };

        model.resetfieldsearch = function() {
            model.txtallkeywordsearh = '';
            model.lblsearchedfields = '';
            model.rbtnGender = '';
            model.rbtndomacile = '';
            model.txtfromagekey = '';
            model.txttoagekey = '';
            model.txtfromheightkey = '';
            model.txttoheightkey = '';
            model.applicationids = [54];
            model.Casteids = undefined;
            model.casteidkey = undefined;
            model.maritalstatusids = undefined;
        };
        model.onchangeselectlistvalues = function(value) {
            var optionSelected = $.trim(value);
            if (optionSelected !== "") {
                model.lblsearchedfields = model.lblsearchedfields === '' ? optionSelected : model.lblsearchedfields + "," + optionSelected;
            }
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
            return model.object;
        };
        return model;
    }
})();