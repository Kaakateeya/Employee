(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getContactData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerPersonalContact_Details', { params: { CustID: obj } });
            },
            submitContactData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerContactDetails_Update', JSON.stringify(obj1));
            },
            submitContactReferenceData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/UpdateContactdetails_Reference', JSON.stringify(obj1));
            },
            submitPrimaryRelationData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getCandidateContactdetailsRelationName', {
                    params: { CustID: obj.CustID, PrimaryMobileRel: obj.PrimaryMobileRel, PrimaryEmailRel: obj.PrimaryEmailRel, iflage: obj.iflage }
                });
            },

            sendMobileCode: function(obj) {
                return http.get(app.apiroot + 'StaticPages/getCustomerdmobileVerfCodesend', {
                    params: { iCountryID: obj.iCountryID, iCCode: obj.iCCode, MobileNumber: obj.MobileNumber, CustFamilyID: obj.CustFamilyID }
                });
            },
            verifyEmail: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getCandidateContactsendmailtoemailverify', { params: { CustID: obj } });
            },
            verifyMobile: function(VCode, CustFamilyid) {
                return http.get(app.apiroot + 'StaticPages/getCustomerEmilVerificationCodeUpdate', { params: { VerificationCode: VCode, CustFamilyID: CustFamilyid } });
            },
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editContactService', factory);

    factory.$inject = ['$http'];
})(angular);