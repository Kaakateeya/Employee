(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('brokerEntryFormService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            submitEntryForm: function(obj) {
                return http.post(app.apiroot + 'smallPages/brokerFormInsert', obj);
            },
            emailExists: function(obj) {
                return http.get(app.apiroot + 'StaticPages/getbrokerEmailMobilenumberexists', { params: obj });
            }
        };
    }
})();