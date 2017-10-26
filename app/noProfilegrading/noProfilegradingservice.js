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
            }
        };
    }
})();