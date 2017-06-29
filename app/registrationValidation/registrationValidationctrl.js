 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('registrationValidationCtrl', ['registrationValidationModel', '$scope', 'authSvc',
             function(registrationValidationModel, scope, authSvc) {
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
                     model.slide.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                     scope.$on("$destroy", vm.destroy);
                 };
                 vm.destroy = function() {
                     model.destroy();
                 };

                 vm.init();
             }
         ]);
 })();