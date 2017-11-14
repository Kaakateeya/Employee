 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('employeePermissionCtrl', controller)

     controller.$inject = ['employeePermissionModel', '$scope'];

     function controller(employeePermissionModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = employeePermissionModel;
             model.scope = scope;
             model.init();
         };

         vm.init();

     }
 })();