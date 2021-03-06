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
                 model.opendiv = true;
                 model.mpObj.txtProfilerevieID = model.mpObj.chkconfidential =
                     model.mpObj.rdnreviewpending = model.mpObj.ddlCaste = model.mpObj.ddlBranch =
                     model.mpObj.ddlApplicationStatus = '';
                 model.isDisabledsubmit = false;
             };
             vm.init();
         }]);
 })();