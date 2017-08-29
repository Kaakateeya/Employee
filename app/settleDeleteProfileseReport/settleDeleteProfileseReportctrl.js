 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('settleDeleteProfileseReportCtrl', controller)

     controller.$inject = ['settleDeleteProfileseReportModel'];

     function controller(settleDeleteProfileseReportModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = settleDeleteProfileseReportModel;
         };

         vm.init();

     }
 })();