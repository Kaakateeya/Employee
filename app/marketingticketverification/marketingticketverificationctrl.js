 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('marketingticketverificationCtrl', ['marketingticketverificationModel', 'authSvc', '$scope',
             function(marketingticketverificationModel, authSvc, scope) {
                 /* jshint validthis:true */
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = marketingticketverificationModel;
                     model.scope = scope;
                     model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                     model.panelbodyhide = true;
                     model.pageloadbindings();
                     model.resetmarketverification();
                 };
                 vm.init();
             }
         ]);


 })();