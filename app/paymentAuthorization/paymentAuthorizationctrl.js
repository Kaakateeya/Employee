 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('paymentAuthorizationCtrl', ['paymentAuthorizationModel', '$scope', 'authSvc', function(paymentAuthorizationModel, scope, authSvc) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = paymentAuthorizationModel;
                 vm.model.scope = scope;
                 model.init();
                 model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                 model.ticketownermarketing = "";
                 model.ticketiddisable = true;
             };
             vm.init();
         }]);
 })();