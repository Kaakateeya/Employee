 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('paymentAuthorizationCtrl', controller);

     controller.$inject = ['paymentAuthorizationModel', '$scope'];

     function controller(paymentAuthorizationModel, scope) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = paymentAuthorizationModel();
             vm.model.scope = scope;
         };

         vm.init();

     }
 })();