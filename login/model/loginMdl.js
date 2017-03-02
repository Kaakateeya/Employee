(function() {
    'use strict';

    function factory($http, uibModal) {
        var loginmodel = {},
            modalpopupopen;
        loginmodel.showpopup = function(url, scope, size) {
            modalpopupopen = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: url,
                scope: scope,
                // size: size,
                backdrop: 'static',
                keyboard: false,
                windowClass: 'zindex'
            });
            return loginmodel;
        };
        loginmodel.closepopup = function() {
            modalpopupopen.close();
            return loginmodel;
        };
        return loginmodel;
    }
    angular
        .module('Kaakateeya')
        .factory('loginModel', factory)

    factory.$inject = ['$http', '$uibModal'];

})();