(function() {
    'use strict';

    function factory(http) {
        return {
            getEmpViewfullProfile: function(ProfileID, EmpID) {

                return http.get(app.apiroot + 'StaticPages/getCustomerViewAdminFullDetails', {
                    params: {
                        ProfileID: ProfileID,
                        EmpID: EmpID
                    }
                });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('employeeViewfullprofilePrintchkservice', factory);
    factory.$inject = ['$http'];
})(angular);