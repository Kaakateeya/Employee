(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('keywordSearchService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            keywordlikesearch: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/keywordlikesearch', obj);
            }
        };
    }
})();