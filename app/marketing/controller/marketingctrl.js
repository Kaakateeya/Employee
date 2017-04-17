 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('marketingCtrl', controller)

     controller.$inject = ['marketingModel'];

     function controller(marketingModel) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = marketingModel;
         };
         vm.init();
     }
 })();