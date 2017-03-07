(function() {
    'use strict';

    function factory(http) {
        return {
            getloginpage: function(form) {

            }
        };
    }
    angular
        .module('Kaakateeya')
        .factory('loginservice', factory);

    factory.$inject = ['$http'];

})();