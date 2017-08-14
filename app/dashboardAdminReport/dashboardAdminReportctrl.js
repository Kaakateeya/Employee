 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('dashboardAdminReportCtrl', ['dashboardAdminReportModel', '$scope',
             function(dashboardAdminReportModel, scope) {
                 /* jshint validthis:true */
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = dashboardAdminReportModel;
                     model.scope = scope;
                 };
                 vm.init();
             }
         ]);
 })();