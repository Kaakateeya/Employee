 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('oldKmplKeywordSearchCtrl', controller)

     controller.$inject = ['oldKmplKeywordSearchModel'];

     function controller(oldKmplKeywordSearchModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             vm.model = oldKmplKeywordSearchModel;
         };

         vm.init();

     }
 })();