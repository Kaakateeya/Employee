(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('listOFServuceTakenService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            listOFServiceGiven: function(obj) {
                return http.post(app.apiroot + 'smallPages/listOFServiceGiven', obj);
            }
        };
    }
})();