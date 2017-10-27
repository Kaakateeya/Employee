 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('matchfollowupReportCtrl', controller);

     controller.$inject = ['matchfollowupReportModel', '$scope'];

     function controller(matchfollowupReportModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = matchfollowupReportModel;
             model.scope = scope;
         };

         vm.init();

     }
 })();