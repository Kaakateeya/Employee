(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('empTrackingService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getempReport: function(obj) {
                return http.post(app.apiroot + 'smallPages/loginLogOutReport', obj);
            },
            getempWorksheet: function(obj) {
                return http.post(app.apiroot + 'smallPages/empWorksheet', obj);
            }
        };
    }
})();