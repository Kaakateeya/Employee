 (function() {
     'use strict';

     function controller(marketingModel) {
         var vm = this;
         vm.init = function() {
             vm.model = marketingModel;
         };

         vm.init();

     }
     angular
         .module('Kaakateeya')
         .controller('marketingCtrl', controller)
     controller.$inject = ['marketingModel'];
 })(angular);