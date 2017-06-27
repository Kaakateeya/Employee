 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('registrationValidationCtrl', ['registrationValidationModel', '$scope',
             function(registrationValidationModel, scope) {
                 /* jshint validthis:true */
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = registrationValidationModel;
                     model.ddlApplicationStatus = '';
                     model.scope = scope;
                     model.grid.TotalRows = '';
                     scope.$on("$destroy", vm.destroy);
                     model.opendiv = true;
                 };
                 vm.destroy = function() {
                     model.destroy();
                 };

                 vm.init();
             }
         ]);
 })();