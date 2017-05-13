(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getPropertyData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getPropertyDetailsDisplay', { params: { CustID: obj } });
            },
            submitPropertyData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/CustomerPropertyUpdatedetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editPropertyService', factory);

    factory.$inject = ['$http'];
})(angular);