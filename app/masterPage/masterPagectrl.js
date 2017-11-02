 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('masterPageCtrl', controller);

     controller.$inject = ['masterPageModel', '$scope'];

     function controller(masterPageModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = masterPageModel;
             model.scope = scope;
             model.init();

         };
         vm.init();
     }
 })();