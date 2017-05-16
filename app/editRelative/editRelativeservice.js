(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getRelativeeData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getRelativeDetailsDisplay', { params: { CustID: obj } });
            },
            submitFBData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerFathersBrotherUpdatedetails', JSON.stringify(obj1));
            },
            submitFSData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerFathersSisterUpdatedetails', JSON.stringify(obj1));
            },
            submitMBData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerMotherBrotherUpdatedetails', JSON.stringify(obj1));
            },
            submitMSData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerMotherSisterUpdatedetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editRelativeService', factory);

    factory.$inject = ['$http'];
})(angular);