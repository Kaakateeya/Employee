(function() {
    'use strict';


    function factory(http) {
        return {
            test: function(flag, ID) {
                return http.get(app.apiroot + 'test', {
                    params: {

                    }
                });
            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('assignSettingsService', factory);

    factory.$inject = ['$http'];

})();