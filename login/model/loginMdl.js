(function() {
    'use strict';

    function factory($http, uibModal, loginservice, route) {
        var loginmodel = {},
            modalpopupopen;
        loginmodel.showpopup = function(url, scope, size) {
            modalpopupopen = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: url,
                scope: scope,
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
        loginmodel.loginsubmit = function(form) {
            // loginservice.getloginpage(form).then(function(response) {
            //     console.log(response);
            // });
            route.go("dashboard", {});
            return loginmodel;

        };
        return loginmodel;
    }
    angular
        .module('Kaakateeya')
        .factory('loginModel', factory);

    factory.$inject = ['$http', '$uibModal', 'loginservice', 'route'];

})();