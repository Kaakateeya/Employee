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
                     model = {};
                     vm.model = model = registrationValidationModel;
                     model.ddlApplicationStatus = '';
                     model.scope = scope;
                     model.grid.TotalRows = '';
                     model.slide.templateUrl = "templates/myprofileSlide.html";
                     model.slide.config.headettemp = "templates/myprofileheader.html";
                     model.opendiv = true;
                     model.slide.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                     model.slideshowopenedflag = 0;
                     model.txtAllPhones = '';
                     model.txtAllEmails = '';
                     model.ddlApplicationStatus = '';
                     model.txtFFMFNATIVE = '';
                     model.txtFatherName = '';
                     model.txtMotherName = '';
                     model.txtFFName = '';
                     model.txtMFSurName = '';
                     model.txtMFName = '';
                     model.txtCFFFSurName = '';
                     model.txtCName = '';
                     model.ddlCaste = '';
                     scope.$on("$destroy", vm.destroy);
                     model.isDisabledsubmit = false;
                 };
                 vm.destroy = function() {
                     model.destroy();
                 };
                 vm.init();
             }
         ]);
 })();