(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settlementPageNewService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            settledInfo: function(obj) {
                return http.post(app.apiroot + 'smallPages/SettledProfilesInfo', obj);
            },
            insertSettledInfo: function(obj) {
                return http.post(app.apiroot + 'smallPages/insertsettleAmountInfo', obj);
            },
            settleInfo: function(id) {
                return http.get(app.apiroot + 'smallPages/getSettleInfo', { params: { profileid: id } });
            }
        };
    }
})();