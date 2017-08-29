 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('matchMeetingCountReportCtrl', controller);

     controller.$inject = ['matchMeetingCountReportModel', '$scope'];

     function controller(matchMeetingCountReportModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = matchMeetingCountReportModel;
             model.reset();
             model.scope = scope;
         };

         vm.init();

     }
 })();