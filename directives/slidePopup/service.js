(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('popupSvc', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            editSubmit: function(apiname, obj) {
                return http.post(app.apiroot + 'CustomerPersonalUpdate/' + apiname, JSON.stringify(obj));
            }
        }
    }
})();