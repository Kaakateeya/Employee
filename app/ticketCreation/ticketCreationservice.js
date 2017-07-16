(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('ticketCreationService', ['$http', function(http) {
            return {
                ticketcreation: function(obj) {
                    return http.post(app.apiroot + 'StaticPages/InsertTicketInfo', obj);
                },
                getticketinformation: function(obj) {
                    return http.post(app.apiroot + 'EmployeeReportPage/Guestticketcreation', obj);
                },
                getprofileidexistornot: function(profileid) {
                    return http.get(app.apiroot + 'EmployeeReportPage/getprofileidexistornot', { params: { profileid: profileid } });
                }
            };
        }]);
})();