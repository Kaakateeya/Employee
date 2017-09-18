 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('keywordSearchCtrl', controller);

     controller.$inject = ['keywordSearchModel', '$scope', 'authSvc'];

     function controller(keywordSearchModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = keywordSearchModel;
             model.scope = scope;
             model.keywordcontrols = true;
             model.btnbacktosearch = false;
             model.empid = model.slide.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             model.slide.templateUrl = "templates/myprofileSlide.html";
             model.slide.config.headettemp = "templates/myprofileheader.html";
             model.MyProfilePageLoad();
         };
         vm.init();
     }
 })();