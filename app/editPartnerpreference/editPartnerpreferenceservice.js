(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getPartnerPreferenceData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerpartnerpreferencesDetailsDisplay', { params: { CustID: obj } });
            },
            submitPartnerPrefData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerPartnerPreferencesUpdatedetails', JSON.stringify(obj1));
            },
            submitPartnerDescData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getPartnerpreference_DiscribeYourPartner', { params: obj });
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editPartnerpreferenceService', factory);

    factory.$inject = ['$http'];
})(angular);