(function() {
    'use strict';


    /** @ngInject */
    function ControllerCtrl(scope, rootScope) {
        var vm = this;


        rootScope.$on('request-start', function(item) {
            //show loading symbol
            scope.isLoader = true;
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
        .controller('loaderCtrl', ['$scope', '$rootScope', ControllerCtrl]);

}());