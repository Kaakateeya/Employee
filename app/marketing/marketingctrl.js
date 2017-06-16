 (function() {
     'use strict';

     function controller(marketingModel, scope) {
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = marketingModel();
             model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('marketingCtrl', controller)
     controller.$inject = ['marketingModel', '$scope'];
 })(angular);