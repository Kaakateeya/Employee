 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('bootstrapTableCtrl', controller)

     controller.$inject = ['bootstrapTableModel'];

     function controller(bootstrapTableModel) {
         /* jshint validthis:true */
         var vm = this;
         var model;

         vm.init = function() {
             vm.model = model = bootstrapTableModel;
         };
         vm.init();
     }
 })();