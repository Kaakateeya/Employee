(function() {
    'use strict';

    function factory(http) {
        return {
            getMyprofilebind: function(flag, ID) {
                return http.get(app.apiroot + 'EmployeeReportPage/getMyProfileBindings', {
                    params: {
                        flag: flag,
                        ID: ID,
                    }
                });
            },
            matchFollowupSelect: function(obj) {
                return http.get(app.apiroot + 'EmployeeReportPage/getMatchfollowupSlideShowResult', {
                    params: {
                        Mobj: obj
                    }
                });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('matchFollowupServices', factory);

    factory.$inject = ['$http'];
})();