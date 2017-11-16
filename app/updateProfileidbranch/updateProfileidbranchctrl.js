 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('updateProfileidbranchCtrl', controller);

     controller.$inject = ['updateProfileidbranchModel', '$scope'];

     function controller(updateProfileidbranchModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = updateProfileidbranchModel;
             model.scope = scope;
             model.init();
         };

         vm.init();

     }
 })();