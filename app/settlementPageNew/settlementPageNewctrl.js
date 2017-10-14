 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('settlementPageNewCtrl', controller);

     controller.$inject = ['settlementPageNewModel', '$scope'];

     function controller(settlementPageNewModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = settlementPageNewModel;
             vm.model.panelbodyhide = true;
             model.scope = scope;
         };

         vm.init();
     }
 })();