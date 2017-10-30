 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('listOFServuceTakenCtrl', controller);

     controller.$inject = ['listOFServuceTakenModel', '$scope'];

     function controller(listOFServuceTakenModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = listOFServuceTakenModel;
             model.opendiv = true;
             model.scope = scope;
             model.reset();
         };

         vm.init();

     }
 })();