(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getProfileSettingData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerprofilesettingDetails', { params: { CustID: obj } });
            },
            submitGradeData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerProfileSetting_Gradeselection', JSON.stringify(obj1));
            },
            submitProfileSettingAndDispalyData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerProfileSetting_ProfileSetting', JSON.stringify(obj1));
            },
            confidentialSubmit: function(custid, confidential, Hconfidential, empid) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerPersonaloffice_purpose', {
                    params: { flag: '7', ID: custid, AboutProfile: empid, IsConfidential: confidential, HighConfendential: Hconfidential }
                });
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editProfileSettingService', factory);

    factory.$inject = ['$http'];
})(angular);