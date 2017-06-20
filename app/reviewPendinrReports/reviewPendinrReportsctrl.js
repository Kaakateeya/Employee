 (function() {
     'use strict';

     function controller(reviewPendinrReportsModel, authSvc, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = reviewPendinrReportsModel();
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
             model.MyProfilePageLoad();
             model.scope = scope;
             model.reviewpendingarray = [];
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('reviewPendinrReportsCtrl', controller);
     controller.$inject = ['reviewPendinrReportsModel', 'authSvc', '$scope'];
 })();