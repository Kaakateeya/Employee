(function(angular) {
    'use strict';

    function factory(http) {
        return {
            generalsearchsubmit: function(obj) {
                return http.get(app.apiroot + 'CustomerSearch/ShowDataForEmployeeGeneral', obj);
            },
            getPrimaryCustomerDataResponse: function(profileid, EmpID) {
                return http.get(app.apiroot + 'CustomerSearch/getPrimaryCustomerDataResponse', {
                    params: {
                        ProfileID: profileid,
                        EmpID: EmpID
                    }
                });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('searchpageServices', factory);
    factory.$inject = ['$http'];
})(angular);