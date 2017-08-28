(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('oldKmplKeywordSearchModel', factory);

    factory.$inject = ['oldKmplKeywordSearchService', 'complex-grid-config', 'complex-slide-config', 'modelpopupopenmethod'];

    function factory(oldKmplKeywordSearchService, configgrid, configslide, modelpopupopenmethod) {
        var model = {};
        model.slide = {};
        model.grid = {};
        model.slide.config = configslide;
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
            //{ Text: "C ApplicationStatus", value: "CApplicationStatus", style: "#2e89d8;" },
            //{ Text: "C Caste", value: "Caste", style: "#2e89d8;" },
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
            //{ Text: "C Gender", value: "CGender", style: "#2e89d8;" },
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
        model.ViewProfile = function(row) {
            window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
        };
        model.ProfileIdTemplateDUrl = function(row) {
            var paidstatusclass = row.paid === true ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "'>" + row.ProfileID + ' (' + row.KMPLID + ')' + "</a>";
            return paid;
        };
        model.grid.columns = [
            { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
            { text: 'FirstName', key: 'FirstName', type: 'label' },
            { text: 'LastName', key: 'LastName' },
            { text: 'DOB', key: 'DOB', type: 'label' },
            { text: 'Age', key: 'Age', type: 'label' },
            { text: 'Height', key: 'Height', type: 'label' },
            { text: 'Caste', key: 'Caste', type: 'label' },
            { text: 'Education', key: 'Education', type: 'label' },
            { text: 'Profession', key: 'Profession', type: 'label' },
            { text: 'JobLocation', key: 'JobLocation', type: 'label' },
            { text: 'Income', key: 'Income', type: 'label' }
        ];
        model.MyProfilePageLoad = function() {
            oldKmplKeywordSearchService.getMyprofilebind(1, 2, '').then(function(response) {
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
        model.Getfilterobject = function(type) {
            // _.each((model.txtsearchfiledsinput).split(' and '), function(item) {
            //     var innerdata = item.indexOf("between") != -1 ? item.split('between') : item.split('like');
            //     model.object.Keyworddlikesrch[type == "text" ? (innerdata[0]).trim() : _.where(model.Searchfields, { Text: (innerdata[0]).trim() })[0].value] = (innerdata[1]).trim();
            // });
            return model.object;
        };
        model.oldkmplsubmit = function(from, to, type) {
            model.Getfilterobject();
            //model.applicationids !== null && model.applicationids !== undefined && model.applicationids !== "" ? model.applicationids 
            model.object.Keyworddlikesrch.CApplicationStatus = 'Active';
            model.object.Keyworddlikesrch.EmpID = model.empid;
            model.object.Keyworddlikesrch.startindex = from;
            model.object.Keyworddlikesrch.EndIndex = to;
            model.object.Keyworddlikesrch.CGender = "Female";
            model.object.Keyworddlikesrch.Caste = model.casteids !== null && model.casteids !== undefined && model.casteids !== "" ? model.casteids : null;
            oldKmplKeywordSearchService.Oldkmplkeywordlikesearch(model.object).then(function(response) {
                console.log(response);
                model.grid.data = response.data;
            });
        };
        ////
        model.grid.pagechange = function(val) {
            var to = val * 100;
            var from = val === 1 ? 1 : to - 99;
            model.MyprofileResult(model.mpObj, from, to, 'grid', 1);
        };
        model.grid.exportexcel = function(topage) {
            model.MyprofileResult(model.mpObj, 1, topage, 'excel', 1);
        };
        model.close = function() {
            modelpopupopenmethod.closepopup();
        };

        model.slidebind = function(old, news, array) {
            if (parseInt(model.topage) - parseInt(news) === 4) {
                model.MyprofileResult(model.mpObj, (model.topage) + 1, (model.topage) + 10, 'slide', 0);
            }
        };
        return model;

    }
})();