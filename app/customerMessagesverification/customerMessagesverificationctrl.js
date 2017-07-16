 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('customerMessagesverificationCtrl', ['customerMessagesverificationModel', function(customerMessagesverificationModel) {
             /* jshint validthis:true */
             var vm = this;

             vm.init = function() {
                 vm.model = customerMessagesverificationModel;
             };

             vm.init();

         }]);

 })();