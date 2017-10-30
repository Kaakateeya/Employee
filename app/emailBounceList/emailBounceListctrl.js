 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('emailBounceListCtrl', controller);

     controller.$inject = ['emailBounceListModel', '$scope'];

     function controller(emailBounceListModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = emailBounceListModel;
             model.panelbodyhide = true;
             model.reset();
             model.scope = scope;
         };

         vm.init();

     }
 })();