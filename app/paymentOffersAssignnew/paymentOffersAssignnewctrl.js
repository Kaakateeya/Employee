 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('paymentOffersAssignnewCtrl', controller);

     controller.$inject = ['paymentOffersAssignnewModel', '$scope'];

     function controller(paymentOffersAssignnewModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = paymentOffersAssignnewModel;
             vm.model.memberShipType = '';
             vm.model.scope = model.scope = scope;
             model.rbtntype = '0';
             model.showOfferDetailsflag = 0;
             model.reset();
         };

         vm.init();
     }
 })();