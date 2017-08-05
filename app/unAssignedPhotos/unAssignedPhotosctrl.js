 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('unAssignedPhotosCtrl', controller);

     controller.$inject = ['unAssignedPhotosModel', 'authSvc', '$scope'];

     function controller(unAssignedPhotosModel, authSvc, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;
         // model.chkval = true;
         vm.init = function() {
             vm.model = model = unAssignedPhotosModel;
             model.scope = scope;
             model.opendiv = true;
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             model.reset();
         };


         vm.init();

     }
 })();