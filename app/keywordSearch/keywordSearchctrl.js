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
             model.controllistbox = false;
             model.empid = model.slide.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             model.slide.templateUrl = "templates/myprofileSlide.html";
             model.slide.config.headettemp = "templates/myprofileheader.html";
             model.opendiv = true;
             model.MyProfilePageLoad();
             model.resetkeyword();
             model.panelbodyhide = true;
             model.txtallkeywordsearh = '';
             model.dobshow = true;
             model.lblsearchedfields = '';
         };
         vm.init();
     }
 })();