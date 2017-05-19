 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('registrationValidationCtrl', controller)

     controller.$inject = ['registrationValidationModel', '$scope'];

     function controller(registrationValidationModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = registrationValidationModel();
             model.ddlApplicationStatus = '';
             model.scope = scope;
             model.grid.TotalRows = '';
         };
         vm.init();
     }
 })();