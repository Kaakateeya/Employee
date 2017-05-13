(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getParentData: function(obj) {
                return http.get(app.apipathold + 'CustomerPersonal/getParentDetailsDisplay', { params: { CustID: obj } });
            },
            getAboutFamilyData: function(obj) {
                return http.get(app.apipathold + 'CustomerPersonal/getParents_AboutMyFamily', { params: { CustID: obj, AboutYourself: '', flag: 0 } });
            },
            submitParentData: function(obj1) {
                return http.post(app.apipathold + 'CustomerPersonalUpdate/CustomerParentUpdatedetails', JSON.stringify(obj1));
            },
            submitAddressData: function(obj1) {
                console.log(JSON.stringify(obj1));
                return http.post(app.apipathold + 'CustomerPersonalUpdate/CustomerContactAddressUpdatedetails', JSON.stringify(obj1));
            },
            submitPhysicalData: function(obj1) {
                return http.post(app.apipathold + 'CustomerPersonalUpdate/CustomerPhysicalAttributesUpdatedetails', JSON.stringify(obj1));
            },
            submitAboutFamilyData: function(obj) {
                return http.get(app.apipathold + 'CustomerPersonal/getParents_AboutMyFamily', { params: obj });
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editParentService', factory);

    factory.$inject = ['$http'];
})(angular);