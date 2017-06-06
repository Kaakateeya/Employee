(function() {
    'use strict';

    function factory(http) {
        return {
            getViewSettlementform: function(profileid) {
                return http.get(app.apiroot + 'StaticPages/getViewSettlementform', { params: { Profileid: profileid } });
            },
            getCheckprofileIDstatus: function(profileid) {
                return http.get(app.apiroot + 'StaticPages/getCheckprofileIDSelect', { params: { Profileid: profileid } });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('viewSettlementformService', factory);

    factory.$inject = ['$http'];
})();