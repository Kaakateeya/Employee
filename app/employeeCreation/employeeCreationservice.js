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
            },
            getUserID: function(branchID) {
                return http.get(app.apiroot + 'smallPages/getLoginName', { params: { intHomeBrchID: branchID } });
            },
            employeeCreation: function(obj) {
                return http.post(app.apiroot + 'smallPages/employeeCreation', obj);
            },
            getEmpCounts: function(empid) {
                return http.get(app.apiroot + 'smallPages/getEmpWorkAssignCounts', { params: { EmpID: empid } });
            },
            setEmpCounts: function(obj) {
                return http.post(app.apiroot + 'smallPages/setEmpAssignCounts', obj);
            }
        };
    }
})();