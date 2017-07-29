 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('myAssignedPhotosCtrl', controller);

     controller.$inject = ['myAssignedPhotosModel', '$scope'];

     function controller(myAssignedPhotosModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = myAssignedPhotosModel;
             model.scope = scope;
             model.reset();
             model.getMyassignedProfiles();
         };

         vm.init();

     }
 })();