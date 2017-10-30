 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('emailBounceReportCtrl', controller);

     controller.$inject = ['emailBounceReportModel'];

     function controller(emailBounceReportModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = emailBounceReportModel;
         };

         vm.init();

     }
 })();