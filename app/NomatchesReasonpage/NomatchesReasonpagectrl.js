 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('NomatchesReasonpageCtrl', controller);

     controller.$inject = ['NomatchesReasonpageModel', '$scope'];

     function controller(NomatchesReasonpageModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = NomatchesReasonpageModel;
             model.scope = scope;
             model.opendiv = false;
             model.resetreports();

         };

         vm.init();

     }
 })();