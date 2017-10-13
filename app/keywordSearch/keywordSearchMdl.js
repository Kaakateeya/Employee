(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('keywordSearchModel', factory);
    factory.$inject = ['keywordSearchService', 'complex-grid-config', 'complex-slide-config', 'modelpopupopenmethod', 'helperservice', 'alert'];

    function factory(keywordSearchService, configgrid, configslide, modelpopupopenmethod, helperservice, alertss) {
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
            { Text: "CandidateAll", value: "CandidateAll", style: "#000;" },
            { Text: "FatherAll", value: "FatherAll", style: "#000;" },
            { Text: "MotherAll", value: "MotherAll", style: "#000;" },
            { Text: "BrotherAll", value: "BrotherAll", style: "#000;" },
            { Text: "SisterAll", value: "SisterAll", style: "#000;" },
            { Text: "MotherBortherAll", value: "MotherBortherAll", style: "#000;" },
            { Text: "MotherSisterAll", value: "MotherSisterAll", style: "#000;" },
            { Text: "FatherBrotheAll", value: "FatherBrotheAll", style: "#000;" },
            { Text: "FatherSisterAll", value: "FatherSisterAll", style: "#000;" },
            { Text: "C EducationalDetails", value: "CEducationalDetails", style: "#dc970d;" },
            { Text: "C EducationCategory", value: "CEducationCategory", style: "#dc970d;" },
            { Text: "C University", value: "CEduUniversity", style: "#dc970d;" },
            { Text: "C SecondaryQualification", value: "CSecondaryQualification", style: "#dc970d;" },
            { Text: "C PrimaryQualification", value: "CPrimaryQualification", style: "#dc970d;" },
            { Text: "C QualificationDetails", value: "CQualificationDetails", style: "#dc970d;" },
            { Text: "C JobLocation", value: "CJobLocation", style: "#dc970d;" },
            { Text: "C CompanyName", value: "Companyname", style: "#dc970d;" },
            { Text: "C MonthlySalary", value: "CMonthlysalary", style: "#dc970d;" },
            { Text: "C Profession", value: "CProfession", style: "#dc970d;" },
            { Text: "C ProfessionDetails", value: "CprofessionDetails", style: "#dc970d;" },
            { Text: "C PropertyDetails", value: "CPropertyDetails", style: "#dc970d;" },
            { Text: "C PropertyType", value: "CpropertyType", style: "#dc970d;" },
            { Text: "C PropertyValue", value: "CPropertyValue", style: "#dc970d;" },
            { Text: "C PlaceOfBirth", value: "CPlaceOfBirth", style: "green;" },
            { Text: "C Gothram", value: "CGothram", style: "green;" },
            { Text: "C Kujadosham", value: "CKujadosham", style: "green;" },
            { Text: "C Lagnam", value: "CLagnam", style: "green;" },
            { Text: "C MaternalGothram", value: "CMaternalGothram", style: "green;" },
            { Text: "C MotherTongue", value: "CMotherTongue", style: "green;" },
            { Text: "C Paadam", value: "CPaadam", style: "green;" },
            { Text: "C Raasi", value: "CRaasi", style: "green;" },
            { Text: "C Star", value: "CStar", style: "green;" },
            { Text: "C StarLanguage", value: "CStarLanguage", style: "green;" },
            { Text: "C TimeofBirth", value: "CTimeofBirth", style: "green;" },
            { Text: "C BornCitigen", value: "CBornCitigen", style: "#2e89d8;" },
            { Text: "C ContactAddress", value: "CContactAddress", style: "#2e89d8;" },
            { Text: "C ContactNo", value: "CContactNo", style: "#2e89d8;" },
            { Text: "C DateofReg", value: "CDateofReg", style: "#2e89d8;" },
            { Text: "C DOB", value: "CDOB", style: "#2e89d8;" },
            { Text: "C EmailID", value: "CEmailID", style: "#2e89d8;" },
            { Text: "C FirstName", value: "CFName", style: "#2e89d8;" },
            { Text: "C LastName", value: "CLName", style: "#2e89d8;" },
            { Text: "C Photos", value: "CPhotos", style: "#2e89d8;" },
            { Text: "C Relision", value: "CRelision", style: "#2e89d8;" },
            { Text: "C SubCaste", value: "CSubCaste", style: "#2e89d8;" },
            { Text: "C FromAge", value: "CFromAge", style: "#2e89d8;" },
            { Text: "C ToAge", value: "CFromHeight", style: "#2e89d8;" },
            { Text: "C Maritalstatus", value: "CMaritalstatus", style: "#2e89d8;" },
            { Text: "C ToHeight", value: "CToAge", style: "#2e89d8;" },
            { Text: "C ToHeight", value: "CToHeight", style: "#2e89d8;" },
            { Text: "C CityOfLiving", value: "CCityOfLiving", style: "#7f54ca;" },
            { Text: "C DistrictOfLiving", value: "CDistrictOfLiving", style: "#7f54ca;" },
            { Text: "C Domicile", value: "CDomicile", style: "#7f54ca;" },
            { Text: "C StateOfLiving", value: "CStateOfLiving", style: "#7f54ca;" },
            { Text: "C PhoneNumberOffice", value: "CPhNosOffice", style: "#00BCD4;" },
            { Text: "C Residence", value: "CResidence", style: "#00BCD4;" },
            { Text: "C Mobile", value: "CMobile", style: "#00BCD4;" },
            { Text: "C Emailid", value: "CEmailid", style: "#00BCD4;" },
            { Text: "C SecondaryEmailID", value: "CSecondary_EmailID", style: "#00BCD4;" },
            { Text: "C PermenentAddress", value: "CPermt_Add", style: "#00BCD4;" },
            { Text: "C Notes", value: "CNotes", style: "#00BCD4;" },
            { Text: "C KnownLanguage", value: "CKnown_Language", style: "#00BCD4;" },
            { Text: "C Diet", value: "CDiet", style: "#00BCD4;" },
            { Text: "C Smoker", value: "CSmoker", style: "#00BCD4;" },
            { Text: "C Drinker", value: "CDrinker", style: "#00BCD4;" },
            { Text: "C BodyType", value: "CBodyType", style: "#00BCD4;" },
            { Text: "C FamilyValue", value: "CFamilyValue", style: "#00BCD4;" },
            { Text: "CPFromAge", value: "PAgeFrom", style: "#607D8B;" },
            { Text: "CPToAge", value: "PAgeTo", style: "#607D8B;" },
            { Text: "CPFromHeight", value: "PHeightFrom", style: "#607D8B;" },
            { Text: "CPToHeight", value: "PHeightTo", style: "#607D8B;" },
            { Text: "CPCaste", value: "PCaste", style: "#607D8B;" },
            { Text: "CPSubCaste", value: "PSubCaste", style: "#607D8B;" },
            { Text: "CPCategory", value: "PCategory", style: "#607D8B;" },
            { Text: "CPQualification", value: "PQualifications", style: "#607D8B;" },
            { Text: "CPProfession", value: "PProfession", style: "#607D8B;" },
            { Text: "CPJobPreference", value: "PJobPreference", style: "#607D8B;" },
            { Text: "CPJobLocation", value: "PLocation", style: "#607D8B;" },
            { Text: "CPAbroadPrefer", value: "PAbroadPrefer", style: "#607D8B;" },
            { Text: "CPCountry", value: "PCountry", style: "#607D8B;" },
            { Text: "CPState", value: "PState", style: "#607D8B;" },
            { Text: "CPDistrict", value: "PDistrict", style: "#607D8B;" },
            { Text: "CPMotherTongue", value: "PMotherTongue", style: "#607D8B;" },
            { Text: "CPComplexion", value: "PComplexion", style: "#607D8B;" },
            { Text: "CPPrefStars", value: "PPrefStars", style: "#607D8B;" },
            { Text: "CPNonPrefStars", value: "PNonPrefStars", style: "#607D8B;" },
            { Text: "CBName", value: "CBName", style: "#607D8B;" },
            { Text: "CBType", value: "CBType", style: "#607D8B;" },
            { Text: "CBEducation", value: "CBEducation", style: "#607D8B;" },
            { Text: "CBProfession", value: "CBProfession", style: "#607D8B;" },
            { Text: "CBDesignation", value: "CBDesignation", style: "#607D8B;" },
            { Text: "CBJobLocation", value: "CBJobLocation", style: "#607D8B;" },
            { Text: "CBPhoneNumber", value: "CBPhone", style: "#607D8B;" },
            { Text: "CBEmailID", value: "CBEmail", style: "#607D8B;" },
            { Text: "CBWName", value: "CBWName", style: "#607D8B;" },
            { Text: "CBWEducation", value: "CBWEducation", style: "#607D8B;" },
            { Text: "CBWProfession", value: "CBWProfession", style: "#607D8B;" },
            { Text: "CBWDesignation", value: "CBWDesignation", style: "#607D8B;" },
            { Text: "CBWPhoneNumber", value: "CBWPhone", style: "#607D8B;" },
            { Text: "CBWEmailId", value: "CBWEmailId", style: "#607D8B;" },
            { Text: "CBWFFirstName", value: "CBWFatherName", style: "#607D8B;" },
            { Text: "CBWFSurName", value: "CBWFatherSName", style: "#607D8B;" },
            { Text: "CBWFPhoneNumber", value: "CBWFPhoneNumber", style: "#607D8B;" },
            { Text: "CBWFNativePlace", value: "CBWFNativePlace", style: "#607D8B;" },
            { Text: "CSName", value: "CSName", style: "#607D8B;" },
            { Text: "CSType", value: "CSType", style: "#607D8B;" },
            { Text: "CSEducation", value: "CSEducation", style: "#607D8B;" },
            { Text: "CSDesignation", value: "CSDesignation", style: "#607D8B;" },
            { Text: "CSJobLocation", value: "CSJobLocation", style: "#607D8B;" },
            { Text: "CSPhoneNumber", value: "CSPNumber", style: "#607D8B;" },
            { Text: "CSEmailID", value: "CSEmailID", style: "#607D8B;" },
            { Text: "CSHFirstName", value: "CSHFirstName", style: "#607D8B;" },
            { Text: "CSHSurName", value: "CSHSurName", style: "#607D8B;" },
            { Text: "CSHEducation", value: "CSHEducation", style: "#607D8B;" },
            { Text: "CSHProfession", value: "CSHProfession", style: "#607D8B;" },
            { Text: "CSHDesignation", value: "CSHDesignation", style: "#607D8B;" },
            { Text: "CSHPhoneNumber", value: "CSHNumber", style: "#607D8B;" },
            { Text: "CSHEmailID", value: "CSHEmailID", style: "#607D8B;" },
            { Text: "CSHFName", value: "CSHFName", style: "#607D8B;" },
            { Text: "CSHFPhoneNumber", value: "CSHFPNumbe", style: "#607D8B;" },
            { Text: "CSHFNative", value: "CSHFNative", style: "#607D8B;" },
            { Text: "CSHCaste", value: "CSHCaste", style: "#607D8B;" },
            { Text: "FName", value: "FName", style: "#607D8B;" },
            { Text: "FEducation", value: "FEducation", style: "#607D8B;" },
            { Text: "FProfession", value: "FProfession", style: "#607D8B;" },
            { Text: "FPhoneNumber", value: "FPhone", style: "#607D8B;" },
            { Text: "FEmailId", value: "FEmailId", style: "#607D8B;" },
            { Text: "FFName", value: "FFName", style: "#607D8B;" },
            { Text: "FFPhoneNumber", value: "FFPhone", style: "#607D8B;" },
            { Text: "FFEmailID", value: "FFEmailID", style: "#607D8B;" },
            { Text: "FFState", value: "FFState", style: "#607D8B;" },
            { Text: "FFDistrict", value: "FFDistrict", style: "#607D8B;" },
            { Text: "FFNative", value: "FFNative", style: "#607D8B;" },
            { Text: "MName", value: "MName", style: "#607D8B;" },
            { Text: "MEducation", value: "MEducation", style: "#607D8B;" },
            { Text: "MProfession", value: "MProfession", style: "#607D8B;" },
            { Text: "MPhoneNumber", value: "MPhone", style: "#607D8B;" },
            { Text: "MEmailId", value: "MEmailId", style: "#607D8B;" },
            { Text: "MFName", value: "MFName", style: "#607D8B;" },
            { Text: "MFPhoneNumber", value: "MFPhone", style: "#607D8B;" },
            { Text: "MFEmailID", value: "MFEmailID", style: "#607D8B;" },
            { Text: "MFState", value: "MFState", style: "#607D8B;" },
            { Text: "MFDistrict", value: "MFDistrict", style: "#607D8B;" },
            { Text: "MFNative", value: "MFNative", style: "#607D8B;" },
            { Text: "MBName", value: "MBName", style: "#607D8B;" },
            { Text: "MBType", value: "MBType", style: "#607D8B;" },
            { Text: "MBProfession", value: "MBProfession", style: "#607D8B;" },
            { Text: "MBPhoneNumber", value: "MBPNumber", style: "#607D8B;" },
            { Text: "MBEmailId", value: "MBEmailId", style: "#607D8B;" },
            { Text: "MSName", value: "MSName", style: "#607D8B;" },
            { Text: "MSType", value: "MSType", style: "#607D8B;" },
            { Text: "MSHFirstName", value: "MSHFName", style: "#607D8B;" },
            { Text: "MSHSurName", value: "MSHSName", style: "#607D8B;" },
            { Text: "MSHNative", value: "MSHNative", style: "#607D8B;" },
            { Text: "MSHProfession", value: "MSHProfession", style: "#607D8B;" },
            { Text: "MSHPhoneNumber", value: "MSHPNumber", style: "#607D8B;" },
            { Text: "MSHEmailID", value: "MSHEmailID", style: "#607D8B;" },
            { Text: "FBName", value: "FBName", style: "#607D8B;" },
            { Text: "FBType", value: "FBType", style: "#607D8B;" },
            { Text: "FBProfession", value: "FBProfession", style: "#607D8B;" },
            { Text: "FBPhoneNumber", value: "FBPNuFBer", style: "#607D8B;" },
            { Text: "FBEmailId", value: "FBEmailId", style: "#607D8B;" },
            { Text: "FSName", value: "FSName", style: "#607D8B;" },
            { Text: "FSType", value: "FSType", style: "#607D8B;" },
            { Text: "FSHFirstName", value: "FSHFName", style: "#607D8B;" },
            { Text: "FSHSurName", value: "FSHSName", style: "#607D8B;" },
            { Text: "FSHNative", value: "FSHNative", style: "#607D8B;" },
            { Text: "FSHProfession", value: "FSHProfession", style: "#607D8B;" },
            { Text: "FSHPhoneNumber", value: "FSHPNuFBer", style: "#607D8B;" },
            { Text: "FSHEmailID", value: "FSHEmailID", style: "#607D8B;" }

        ];
        model.checkTxt = function(val) {
            return val !== '' && val !== undefined ? val : '';
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
        model.keywordlikesearch = function(from, to, type) {
            model.topage = to;
            if (model.checkTxt(model.allphones) !== '' || model.checkTxt(model.allemails) !== '' || model.checkTxt(model.allnativeplaces) !== '' || model.checkTxt(model.allsurnames) !== '' || model.checkTxt(model.allEducation) !== '' || model.checkTxt(model.allProfession) !== '') {
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
        };
        ////
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
            model.allphones = "";
            model.allemails = "";
            model.allnativeplaces = "";
            model.allsurnames = "";
            model.applicationids = [54];
        };
        return model;
    }
})();