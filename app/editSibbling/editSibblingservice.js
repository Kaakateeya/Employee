(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getSibblingeData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getsiblingsDetailsDisplay', { params: { CustID: obj } });
            },
            submitSibBroData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerSibBrotherUpdatedetails', JSON.stringify(obj1));
            },
            submitSibSisData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerSibSisterUpdatedetails', JSON.stringify(obj1));
            },
            submitSibCountsData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/UpdateSibblingCounts', JSON.stringify(obj1));
            },
            allowblockWebusers: function(custid) {
                return http.get(app.apiroot + 'StaticPages/getRegisteredBranchStatus', { params: { StrCustID: custid } });
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editSibblingService', factory);

    factory.$inject = ['$http'];
})(angular);