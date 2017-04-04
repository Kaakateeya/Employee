(function() {
    'use strict';

    function factory(http) {
        return {
            generalsearchsubmit: function(obj) {
                return http.post(app.apiroot + 'CustomerSearch/ShowDataForEmployeeGeneral', obj);
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('matchFollowupServices', factory);

    factory.$inject = ['$http'];
})();