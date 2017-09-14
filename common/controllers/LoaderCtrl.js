(function(angular) {
    'use strict';


    /** @ngInject */
    function ControllerCtrl(scope, rootScope, uibModal) {
        var vm = this;
        var modalpopupopenload;
        rootScope.$on('request-start', function(item) {
            //show loading symbol
            scope.isLoader = true;
            // modalpopupopenload = uibModal.open({
            //     ariaLabelledBy: 'modal-title',
            //     ariaDescribedBy: 'modal-body',
            //     templateUrl: "loadersymbol.html",
            //     scope: scope,
            //     backdrop: 'static',
            //     keyboard: false
            // });

            console.log('Request Started');
        });
        rootScope.$on('request-fail', function(item) {
            //show loading symbol
            console.log('Request Failed');
        });
        rootScope.$on('request-end', function(item) {
            //show loading symbol
            scope.isLoader = false;
            console.log('Request Ended');
        });

    }
    angular
        .module('Kaakateeya')
        .controller('loaderCtrl', ['$scope', '$rootScope', '$uibModal', ControllerCtrl]);

}(angular));