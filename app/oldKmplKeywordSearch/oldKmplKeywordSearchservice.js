(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('oldKmplKeywordSearchService', factory)

    factory.$inject = ['$http'];

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
            Oldkmplkeywordlikesearch: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/Oldkmplkeywordlikesearch', obj);
            }
        };
    }
})();