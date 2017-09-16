(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('keywordLikeSearchService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            Oldkmplkeywordlikesearch: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/Oldkmplkeywordlikesearch', obj);
            }
        };
    }
})();