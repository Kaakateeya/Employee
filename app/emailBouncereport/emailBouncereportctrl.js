 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('emailBounceReportCtrl', controller);

     controller.$inject = ['emailBounceReportModel', '$scope'];

     function controller(emailBounceReportModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = emailBounceReportModel;
         };

         vm.init();

     }
 })();