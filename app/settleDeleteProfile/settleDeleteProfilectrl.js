 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('settleDeleteProfileCtrl', controller)

     controller.$inject = ['settleDeleteProfileModel'];

     function controller(settleDeleteProfileModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = settleDeleteProfileModel();
         };

         vm.init();

     }
 })();