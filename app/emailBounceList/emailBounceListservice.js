(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('emailBounceListService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getEmailsBouncedList: function(obj) {
                return http.post(app.apiroot + 'smallPages/emailBouncelist', obj);
            }
        };
    }
})();