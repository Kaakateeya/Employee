 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('paymentAuthorizationCtrl', ['paymentAuthorizationModel', '$scope', function(paymentAuthorizationModel, scope) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = paymentAuthorizationModel;
                 vm.model.scope = scope;
                 model.init();
             };
             vm.init();
         }]);
 })();