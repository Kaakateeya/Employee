 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('matchMeetingEntryFormCtrl', controller);

     controller.$inject = ['matchMeetingEntryFormModel', '$scope'];

     function controller(matchMeetingEntryFormModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = matchMeetingEntryFormModel;
             model.scope = scope;
             model.reset();
         };

         vm.init();

     }
 })();