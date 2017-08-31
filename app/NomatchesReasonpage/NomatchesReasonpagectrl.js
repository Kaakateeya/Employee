 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('NomatchesReasonpageCtrl', ['NomatchesReasonpageModel', '$scope', 'authSvc', function(NomatchesReasonpageModel, scope, authSvc) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = NomatchesReasonpageModel;
                 model.scope = scope;
                 model.opendiv = true;
                 model.panelbodyhide = true;
                 model.resetreports();
                 model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                 // model.binddata('table', '');
             };
             vm.init();
         }]);
 })();