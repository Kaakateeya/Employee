(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('customerMessagesverificationService', ['$http', function(http) {
            return {
                customermeassgeverification: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/customermeassgeverification', obj);
                },
                updatecustomermessages: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/updatecustomermessages', obj);
                }
            };
        }]);
})();