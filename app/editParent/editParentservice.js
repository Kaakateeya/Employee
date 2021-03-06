(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getParentData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getParentDetailsDisplay', { params: { CustID: obj } });
            },
            getAboutFamilyData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getParents_AboutMyFamily', { params: { CustID: obj, AboutYourself: '', flag: 0 } });
            },
            submitParentData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerParentUpdatedetails', JSON.stringify(obj1));
            },
            submitAddressData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerContactAddressUpdatedetails', JSON.stringify(obj1));
            },
            submitPhysicalData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerPhysicalAttributesUpdatedetails', JSON.stringify(obj1));
            },
            submitAboutFamilyData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getParents_AboutMyFamily', { params: obj });
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editParentService', factory);

    factory.$inject = ['$http'];
})(angular);