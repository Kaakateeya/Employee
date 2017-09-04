 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('emailBouncereportCtrl', controller)

     controller.$inject = ['emailBouncereportModel'];

     function controller(emailBouncereportModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = emailBouncereportModel;
         };

         vm.init();

     }
 })();