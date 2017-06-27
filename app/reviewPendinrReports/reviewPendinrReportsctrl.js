 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('reviewPendinrReportsCtrl', ['reviewPendinrReportsModel', 'authSvc', '$scope', function(reviewPendinrReportsModel, authSvc, scope) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = reviewPendinrReportsModel;
                 model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                 model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
                 model.MyProfilePageLoad();
                 model.scope = scope;
                 model.reviewpendingarray = [];
                 model.mpObj.rdnGender = "";
                 model.mpObj.rdntypeofprofile = "";
             };
             vm.init();
         }]);
 })();