 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('matchMeetingEntryFormCtrl', controller)

     controller.$inject = ['matchMeetingEntryFormModel'];

     function controller(matchMeetingEntryFormModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = matchMeetingEntryFormModel();
         };

         vm.init();

     }
 })();