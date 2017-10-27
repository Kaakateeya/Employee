(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('noProfilegradingService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getNoProfileGradeProfiles: function(obj) {
                return http.post(app.apiroot + 'smallPages/noProfileGrade', obj);
            },
            GetDataStaging: function(id) {
                return http.get(app.apiroot + 'smallPages/GetDataStaging', { params: { CustID: id } });
            },
            UpdateGrading: function(obj) {
                return http.post(app.apiroot + 'smallPages/UpdateGrading', obj);
            }
        };
    }
})();