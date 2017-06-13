(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getEducationData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerEducationdetails', { params: { CustID: obj } });
            },
            getProfessionData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerProfessiondetails', { params: { CustID: obj } });
            },
            getAboutData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getEducationProfession_AboutYourself', { params: { CustID: obj, AboutYourself: '', flag: 0 } });
            },
            submitEducationData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerPersonalUpdateEducationdetail', JSON.stringify(obj1));
            },
            submitProfessionData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerPersonalUpdateProfessionDetails', JSON.stringify(obj1));
            },
            submitAboutUrData: function(obj1) {
                return http.get(app.apiroot + 'CustomerPersonal/getEducationProfession_AboutYourself', { params: obj1 });
            },

            getCustomerData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getpersonaldetails_Customer', { params: { CustID: obj } });
            },
            submitCustomerData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/UpdatePersonalDetails_Customersetails', JSON.stringify(obj1));
            },
            submitGradeData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerProfileSetting_Gradeselection', JSON.stringify(obj1));
            }

        };
    }

    angular
        .module('Kaakateeya')
        .factory('editEducationService', factory);

    factory.$inject = ['$http'];
})(angular);