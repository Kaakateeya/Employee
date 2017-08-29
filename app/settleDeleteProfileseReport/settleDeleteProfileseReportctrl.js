 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('settleDeleteProfileseReportCtrl', controller);

     controller.$inject = ['settleDeleteProfileseReportModel', '$scope', 'authSvc'];

     function controller(settleDeleteProfileseReportModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = settleDeleteProfileseReportModel;
             model.Admin = authSvc.isAdmin();
             model.reset();
         };

         vm.init();

     }
 })();