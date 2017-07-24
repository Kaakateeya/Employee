 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('brokerEntryFormCtrl', controller)

     controller.$inject = ['brokerEntryFormModel'];

     function controller(brokerEntryFormModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = brokerEntryFormModel;
         };

         vm.init();

     }
 })();