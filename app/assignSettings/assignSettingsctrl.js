 (function() {
     'use strict';



     function controller(assignSettingsModel, authSvc, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = assignSettingsModel();

         };

         vm.init();

     }
     angular
         .module('Kaakateeya')
         .controller('assignSettingsCtrl', controller);

     controller.$inject = ['assignSettingsModel', 'authSvc', '$scope'];
 })();