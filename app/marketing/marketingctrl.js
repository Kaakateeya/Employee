 (function() {
     'use strict';

     function controller(marketingModel, scope) {
         var vm = this;
         vm.init = function() {
             vm.model = marketingModel;
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('marketingCtrl', controller)
     controller.$inject = ['marketingModel', '$scope'];
 })(angular);