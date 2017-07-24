 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('brokerProfileRegistrationCtrl', controller)

     controller.$inject = ['brokerProfileRegistrationModel'];

     function controller(brokerProfileRegistrationModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = brokerProfileRegistrationModel;
         };

         vm.init();

     }
 })();