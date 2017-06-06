 (function() {
     'use strict';



     function controller($location, scope, serviceSlideShowModel) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = serviceSlideShowModel;
             model.scope = scope;
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('serviceSlideShowCtrl', controller);

     controller.$inject = ['$location', '$scope', 'serviceSlideShowModel'];
 })();