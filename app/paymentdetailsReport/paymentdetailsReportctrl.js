 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('paymentdetailsReportCtrl', ['paymentdetailsReportModel', '$scope', 'authSvc',
             function(paymentdetailsReportModel, scope, authSvc) {
                 /* jshint validthis:true */
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = paymentdetailsReportModel;
                     model.scope = scope;
                     model.opendiv = true;
                     model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                     model.panelbodyhide = true;
                     model.resetcontrols();
                     model.pageloadbindings();
                 };
                 vm.init();
             }
         ]);
 })();