(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('dashboardAdminReportService', ['$http',
            function(http) {
                return {
                    test: function() {
                        return http.get(app.apiroot + 'test', { params: '' });
                    }
                };
            }
        ]);
})();