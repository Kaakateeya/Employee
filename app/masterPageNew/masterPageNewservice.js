(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('masterPageNewService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            MasterDataselect: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/MasterDataselect', obj);
            },
            MasterdataInsertUpdate: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/MasterdataInsertUpdate', obj);
            }
        };
    }
})();