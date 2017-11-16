(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('updateProfileidbranchService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            updateprofilebranchid: function(Profileid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getupdateprofilebranchid', {
                    params: {
                        Profileid: Profileid
                    }
                });
            }
        };
    }
})();