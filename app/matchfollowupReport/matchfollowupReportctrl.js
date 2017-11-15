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
             vm.model = model = matchfollowupReportModel.init();
             model.scope = scope;
             model.empNamesInOutArr = [];
             model.panelbodyshow = true;
         };
         vm.init();

     }
 })();