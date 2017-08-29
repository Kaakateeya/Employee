(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchMeetingCountReportService', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            matchMeetingCountReport: function(obj) {
                return http.post(app.apiroot + 'smallPages/matchMeetingCountReport', obj);
            },
            matchMeetingCountInfo: function(obj) {
                return http.post(app.apiroot + 'smallPages/matchMeetingCountInfo', obj);
            }
        };
    }
})();