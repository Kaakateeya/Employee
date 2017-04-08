 (function() {
     'use strict';

     function controller(expressInterestModel, scope, $rootScope) {
         debugger;

         var vm = this;

         vm.init = function() {
             vm.model = expressInterestModel;
             vm.model.scope = scope;
             vm.model.exiObj = {};
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('expressInterestCtrl', controller)
     controller.$inject = ['expressInterestModel', '$scope', '$rootScope'];
 })(angular);