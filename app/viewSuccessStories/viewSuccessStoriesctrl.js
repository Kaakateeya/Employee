 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('viewSuccessStoriesCtrl', controller);

     controller.$inject = ['viewSuccessStoriesModel', '$scope', 'authSvc'];

     function controller(viewSuccessStoriesModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = viewSuccessStoriesModel;
             model.opendiv = true;
             model.scope = scope;
             model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
             model.typeofAction = '';
             model.reset();

         };

         vm.init();

     }
 })();