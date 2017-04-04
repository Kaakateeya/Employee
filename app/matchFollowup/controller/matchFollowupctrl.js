 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('matchFollowupCtrl', controller)

     controller.$inject = ['matchFollowupModel'];

     function controller(matchFollowupModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = matchFollowupModel;
         };


         vm.init();
     }
 })();