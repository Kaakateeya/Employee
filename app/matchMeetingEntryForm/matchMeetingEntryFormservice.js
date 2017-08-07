(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchMeetingEntryFormService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getEmpDetails: function(profileid, bridegroomflag) {
                return http.get(app.apiroot + 'smallPages/GetEmployeeName', { params: { profileID: profileid, BridegroomFlag: bridegroomflag } });
            },
            MMFormSubmit: function(obj) {
                return http.post(app.apiroot + 'smallPages/matchMeetingEntryForm', obj);
            },
            getMatchMeetingData: function(bridecustid, groomCustid) {
                return http.get(app.apiroot + 'smallPages/GetmatchMeetingData', { params: { brideCustID: bridecustid, groomCustID: groomCustid } });
            }
        };
    }
})();