 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('mailFormatsCtrl', controller)

     controller.$inject = ['mailFormatsModel'];

     function controller(mailFormatsModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = mailFormatsModel;
         };

         vm.init();

     }
 })();