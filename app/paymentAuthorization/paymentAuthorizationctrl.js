 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('paymentAuthorizationCtrl', controller)

     controller.$inject = ['paymentAuthorizationModel'];

     function controller(paymentAuthorizationModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = paymentAuthorizationModel();
         };

         vm.init();

     }
 })();