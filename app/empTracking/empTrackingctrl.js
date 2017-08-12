 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('empTrackingCtrl', controller);

     controller.$inject = ['empTrackingModel', '$scope'];

     function controller(empTrackingModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = empTrackingModel;
             model.opendiv = true;
             model.scope = scope;
         };

         vm.init();

     }
 })();