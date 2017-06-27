 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('registrationValidationCtrl', ['registrationValidationModel', '$scope', function(registrationValidationModel, scope) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = registrationValidationModel;
                 model.ddlApplicationStatus = '';
                 model.scope = scope;
                 model.grid.TotalRows = '';
             };
             vm.init();
         }]);
 })();