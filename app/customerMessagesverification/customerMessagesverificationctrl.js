 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('customerMessagesverificationCtrl', ['customerMessagesverificationModel', '$scope', function(customerMessagesverificationModel, scope) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = customerMessagesverificationModel;
                 model.scope = scope;
                 model.customermeassgeverification();
                 model.isDisabledsubmit = false;
             };
             vm.init();

         }]);

 })();