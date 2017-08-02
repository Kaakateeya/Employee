 (function(angular) {
     'use strict';

     function controller(loginModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             //  if (authSvc.LoginEmpid() !== loginModel.empid) {
             //      vm.model = model = loginModel.init();
             //  } else {
             //      vm.model = model = loginModel;
             //  }
             vm.model = model = loginModel;
         };
         vm.init();

     }

     angular.module('Kaakateeya').controller('loginCtrl', ['loginModel', '$scope', 'authSvc', controller]);

 })(angular);