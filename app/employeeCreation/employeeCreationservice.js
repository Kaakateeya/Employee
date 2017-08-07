(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('employeeCreationService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getEmpList: function(obj) {
                return http.post(app.apiroot + 'smallPages/employeeList', obj);
            }
        };
    }
})();