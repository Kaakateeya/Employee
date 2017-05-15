(function(angular) {
    'use strict';

    function factory(http) {
        return {
            getSpouseData: function(obj) {
                return http.get(app.apiroot + 'CustomerPersonal/getCustomerPersonalSpouse_Details', { params: { CustID: obj } });
            },
            submitSpouseData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/UpdateSpoucedetails_Customersetails', JSON.stringify(obj1));
            },
            submitChildeData: function(obj1) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/UpdateSpouseChildDetails', JSON.stringify(obj1));
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('editSpouseService', factory);

    factory.$inject = ['$http'];
})(angular);