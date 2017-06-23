app.factory('SelectBindServiceApp', ["$http", function(http) {
    return {
        countrySelect: function() {

            return http.get(app.apiroot + 'Dependency/getCountryDependency', { params: { dependencyName: "", dependencyValue: "" } });
        },
        Searchcountry: function() {
            return http.get(app.apiroot + 'Dependency/getCountryDependency', { params: { dependencyName: "Searchcountry", dependencyValue: "" } });
        },
        stateSelect: function(dependencyVal) {

            return http.get(app.apiroot + 'Dependency/getCountryDependency', { params: { dependencyName: "state", dependencyValue: dependencyVal } });
        },
        districtSelect: function(dependencyVal1) {
            return http.get(app.apiroot + 'Dependency/getCountryDependency', { params: { dependencyName: "distric", dependencyValue: dependencyVal1 } });
        },
        citySelect: function(dependencyVal2) {

            return http.get(app.apiroot + 'Dependency/getCountryDependency', { params: { dependencyName: "city", dependencyValue: dependencyVal2 } });
        },
        EducationCatgory: function() {
            return http.get(app.apiroot + 'Dependency/getEducationDependency', { params: { dependencyName: "", dependencyValue: "" } });
        },
        EducationGroup: function(dependencyVal2) {
            return http.get(app.apiroot + 'Dependency/getEducationDependency', { params: { dependencyName: "educationGroup", dependencyValue: dependencyVal2 } });
        },
        EducationSpecialisation: function(dependencyVal2) {

            return http.get(app.apiroot + 'Dependency/getEducationDependency', { params: { dependencyName: "educationSpeacialisation", dependencyValue: dependencyVal2 } });
        },
        ProfessionCatgory: function() {
            return http.get(app.apiroot + 'Dependency/getProfessionDependency', { params: { dependencyName: "ProfessionCategory", dependencyValue: "" } });
        },
        ProfessionGroup: function() {
            return http.get(app.apiroot + 'Dependency/getProfessionDependency', { params: { dependencyName: "", dependencyValue: "" } });
        },
        ProfessionSpecialisation: function(dependencyVal2) {

            return http.get(app.apiroot + 'Dependency/getProfessionDependency', { params: { dependencyName: "ProfessionGroup", dependencyValue: dependencyVal2 } });
        },
        profspecialization: function(dependencyVal2) {
            return http.get(app.apiroot + 'Dependency/getProfessionDependency', { params: { dependencyName: "ProfessionSpecialisation", dependencyValue: dependencyVal2 } });
        },
        casteselect: function() {

            return http.get(app.apiroot + 'Dependency/getDropdown_filling_values', { params: { strDropdownname: "CasteName" } });
        },
        countryCodeselect: function() {

            return http.get(app.apiroot + 'Dependency/getDropdown_filling_values', { params: { strDropdownname: "CountryCode" } });
        },
        currency: function() {

            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Currency', dependencyValue: '', dependencyflagID: '' } });
        },
        SearchCurrency: function() {

            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'SearchCurrency', dependencyValue: '', dependencyflagID: '' } });
        },
        stars: function(obj) {
            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'StarType', dependencyValue: obj, dependencyflagID: '' } });
        },
        castedependency: function(obj1, obj2) {

            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Caste', dependencyValue: obj1, dependencyflagID: obj2 } });
        },
        subCasteBind: function(obj1) {

            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'SubCaste', dependencyValue: obj1, dependencyflagID: '' } });
        },
        branch: function(obj1) {

            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Region', dependencyValue: obj1, dependencyflagID: '' } });
        },

        newProfessionCat: function() {
            return http.get(app.apiroot + 'Dependency/getCountryDependency', { params: { dependencyName: "NewProfessionCat", dependencyValue: '' } });
        },
        BranchName: function() {
            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'BranchName', dependencyValue: '', dependencyflagID: '' } });
        },
        BranchNamebind: function(parentval1) {
            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Region', dependencyValue: parentval1, dependencyflagID: '' } });
        },
        Applicationstatus: function() {
            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Applicationstatus', dependencyValue: '', dependencyflagID: '' } });
        },
        Smoke: function() {
            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Smoke', dependencyValue: '', dependencyflagID: '' } });
        },
        Diet: function() {
            return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Diet', dependencyValue: '', dependencyflagID: '' } });
        },
        getrelationships: function(flag, profileid, about) {
            return http.get(app.apiroot + 'CustomerPersonal/getCustomerPersonaloffice_purpose', {
                params: {
                    flag: flag,
                    ID: profileid,
                    AboutProfile: about,
                    IsConfidential: "",
                    HighConfendential: ""
                }
            });
        },
        forgotpasswordemail: function(emailorprofileid) {
            return http.get(app.apiroot + 'StaticPages/getForgotPassword', { params: { Username: emailorprofileid } });
        },
        sendMobileCode: function(obj) {
            return http.get(app.apiroot + 'StaticPages/getCustomerdmobileVerfCodesend', {
                params: { iCountryID: obj.iCountryID, iCCode: obj.iCCode, MobileNumber: obj.MobileNumber, CustFamilyID: obj.CustFamilyID }
            });
        },

        sendMobileCodeBasedOnContactID: function(obj) {
            return http.get(app.apiroot + 'StaticPages/getResendmobile', {
                params: { iCountryID: obj.iCountryID, iCCode: obj.iCCode, MobileNumber: obj.MobileNumber, CustContactNumbersID: obj.CustContactNumbersID }
            });
        },
        verifyEmail: function(obj) {
            return http.get(app.apiroot + 'CustomerPersonal/getCandidateContactsendmailtoemailverify', { params: { CustID: obj } });
        },
        verifyMobile: function(VCode, CustFamilyid) {
            return http.get(app.apiroot + 'StaticPages/getCustomerEmilVerificationCodeUpdate', { params: { VerificationCode: VCode, CustFamilyID: CustFamilyid } });
        },

        verifyMobileBasedOnContactID: function(VCode, CustContactNumbersid) {
            return http.get(app.apiroot + 'StaticPages/getEmilVerificationCode', { params: { VerificationCode: VCode, i_EmilMobileVerification: 2, CustContactNumbersID: CustContactNumbersid } });
        },

        getphotoslideimages: function(custid) {
            return http.get(app.apiroot + 'StaticPages/GetPhotoSlideImages', { params: { CustID: custid } });
        },
        playbtnProfileData: function(profileid) {
            return http.get(app.apiroot + 'CustomerPersonal/getProfileIDPlaybutton', {
                params: {
                    ProfileID: profileid
                }
            });
        },
        marketReplytype: function(type) {
            return http.get(app.apiroot + 'ExpressInterest/getMatchFollowup_linq', {
                params: {
                    flag: 'Market_replytype',
                    ID: '',
                    RelationShipID: ''
                }
            });
        },
        EmpBinding: function(flag, ID) {

            return http.get(app.apiroot + 'EmployeeReportPage/getMyProfileBindings', {
                params: {
                    flag: flag,
                    ID: ID,
                }
            });
        },
        getRelationName: function(flag, ID, RelationShipID) {
            return http.get(app.apiroot + 'ExpressInterest/getExpressInterest_linq', {
                params: {
                    flag: flag,
                    ID: ID,
                    RelationShipID: RelationShipID
                }
            });
        },
        EmpwithBranch: function(flag, ID) {
            return http.get(app.apiroot + 'EmployeeReportPage/getMyProfileBindingsBranch', {
                params: {
                    flag: flag,
                    ID: ID
                }
            });
        },
        bothreplytypeBind: function() {
            return http.get(app.apiroot + 'ExpressInterest/getMatchFollowup_linq', {
                params: {
                    flag: 'bothside_replytype',
                    ID: '',
                    RelationShipID: ''
                }
            });
        },
        upadateremainderdate: function(obj) {
            return http.post(app.apiroot + 'EmployeeReportPage/createReminderInsert', obj);
        }

    };
}]);