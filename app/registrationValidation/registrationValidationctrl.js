 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('registrationValidationCtrl', controller)

     controller.$inject = ['registrationValidationModel'];

     function controller(registrationValidationModel) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = registrationValidationModel;
             model.ddlApplicationStatus = '';
         };
         vm.init();
     }
 })();