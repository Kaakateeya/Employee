 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('masterPageNewCtrl', controller)

     controller.$inject = ['masterPageNewModel', '$scope'];

     function controller(masterPageNewModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = masterPageNewModel;
             model.scope = scope;
             model.init();
         };

         vm.init();

     }
 })();