(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('loginservice', factory)

    factory.$inject = ['$http', '$uibModal'];

    function factory($http, uibModal) {
        var modalpopupopen;

        var service = {
            showpopup: showpopup
        };

        return service;

        function showpopup() {
            alert(111);
            //url, scope, size
            // modalpopupopen = uibModal.open({
            //     ariaLabelledBy: 'modal-title',
            //     ariaDescribedBy: 'modal-body',
            //     templateUrl: url,
            //     scope: scope,
            //     size: size,
            //     backdrop: 'static',
            //     keyboard: false
            // });
        }
    }
})();