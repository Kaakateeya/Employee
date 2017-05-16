(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getReferenceData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getReferenceViewDetailsDisplay', { params: { CustID: obj } });
            },
            submitReferenceData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerReferencedetailsUpdatedetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editReferenceService', factory);

    factory.$inject = ['$http'];
})(angular);