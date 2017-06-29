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
                     model.slide.templateUrl = "templates/myprofileSlide.html";
                     model.slide.config.headettemp = "templates/myprofileheader.html";
                     model.opendiv = true;
                     scope.$on("$destroy", vm.destroy);
                 };
                 vm.destroy = function() {
                     model.destroy();
                 };

                 vm.init();
             }
         ]);
 })();