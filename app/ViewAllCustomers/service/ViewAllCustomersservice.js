(function(angular) {
    'use strict';

    function factory(http) {
        var ProfileID = null;
        return {

            getViewCustomerData: function(EmpID, ProfileIDName, ProfileIDStatus) {

                return http.get(app.apiroot + 'CustomerPersonal/getViewAllCustomersSearch', {
                    params: {
                        EmpID: EmpID,
                        SearchData: ProfileIDName,
                        ProfileIDStatus: ProfileIDStatus
                    }
                });
            },
            kmplprofileIDData: function(EmpID, ProfileIDName) {
                return http.get(app.apiroot + 'CustomerPersonal/getViewAllCustomersKMPLProfileID', {
                    params: {
                        EmpID: EmpID,
                        SearchData: ProfileIDName
                    }
                });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('ViewAllCustomerService', factory);
    factory.$inject = ['$http'];

})(angular);