 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('oldKmplKeywordSearchCtrl', controller);

     controller.$inject = ['oldKmplKeywordSearchModel', '$scope', 'authSvc'];

     function controller(oldKmplKeywordSearchModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = oldKmplKeywordSearchModel;
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