 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('settlementNewCtrl', controller)

     controller.$inject = ['settlementNewModel'];

     function controller(settlementNewModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = settlementNewModel;
         };

         vm.init();

     }
 })();