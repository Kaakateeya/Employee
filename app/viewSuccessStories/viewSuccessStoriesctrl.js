 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('viewSuccessStoriesCtrl', controller)

     controller.$inject = ['viewSuccessStoriesModel'];

     function controller(viewSuccessStoriesModel) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = viewSuccessStoriesModel;
             model.opendiv = true;
         };

         vm.init();

     }
 })();