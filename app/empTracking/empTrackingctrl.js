 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('empTrackingCtrl', controller)

     controller.$inject = ['empTrackingModel'];

     function controller(empTrackingModel) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = empTrackingModel;
             model.opendiv = true;
         };

         vm.init();

     }
 })();