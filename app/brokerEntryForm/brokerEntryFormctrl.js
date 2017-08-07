 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('brokerEntryFormCtrl', controller)

     controller.$inject = ['brokerEntryFormModel', '$scope'];

     function controller(brokerEntryFormModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = brokerEntryFormModel;
             model.reset();
             model.scope = scope;
         };

         vm.init();

     }
 })();