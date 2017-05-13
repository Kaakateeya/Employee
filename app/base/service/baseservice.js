(function(angular) {
    'use strict';

    function factory(http) {
        return {
            personalDetails: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getpersonalMenuDetails', { params: { CustID: obj } });
            },
            menuReviewstatus: function(Custid, type, sectionid) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerPersonalMenuReviewStatus', { params: { CustID: Custid, iReview: type, SectionID: sectionid } });
            },
            nodatastatus: function(id) {
                return http.get(app.apiroot + 'CustomerPersonalUpdate/getNoDataInformationLinkDisplay', { params: { ProfileID: id } });
            },
            getPhotoInfn: function(custid) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerPersonaloffice_purpose', {
                    params: { flag: '8', ID: custid, AboutProfile: '', IsConfidential: '', HighConfendential: '' }
                });
            },
            PhotoRequest: function(ProfileID, empid) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerphotoRequestDisplay', {
                    params: { profileid: ProfileID, EMPID: empid, ticketIDs: '' }
                });
            },
            menudata: function(custid) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerPersonaloffice_purpose', {
                    params: { flag: '9', ID: custid, AboutProfile: '', IsConfidential: '', HighConfendential: '' }
                });
            }

        };
    }

    angular
        .module('Kaakateeya')
        .factory('baseService', factory);

    factory.$inject = ['$http'];
})(angular);