 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('paymentOffersAssignCtrl', controller)

     controller.$inject = ['paymentOffersAssignModel', '$scope'];

     function controller(paymentOffersAssignModel, scope) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = paymentOffersAssignModel();
             vm.model.memberShipType = '';
             vm.model.scope = scope;
         };

         vm.init();
     }
 })();