 (function() {
     'use strict';

     function controller(bootstrapSlideModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = bootstrapSlideModel;
             model.scope = scope;
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('bootstrapSlideCtrl', controller);
     controller.$inject = ['bootstrapSlideModel', '$scope'];
 })();