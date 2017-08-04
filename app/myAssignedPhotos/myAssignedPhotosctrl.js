 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('myAssignedPhotosCtrl', controller);

     controller.$inject = ['myAssignedPhotosModel', '$scope', 'authSvc'];

     function controller(myAssignedPhotosModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = myAssignedPhotosModel;
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             model.scope = scope;
             model.reset();
             model.getMyassignedProfiles();
         };

         vm.init();

     }
 })();