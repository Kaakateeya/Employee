 (function(angular) {
     'use strict';

     function controller(editEducationModel, scope, baseModel, window) {
         var vm = this;
         var model;
         scope.model = {};
         vm.scope = scope;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editEducationModel;
             editEducationModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editEducationCtrl', controller);

     controller.$inject = ['editEducationModel', '$scope', 'baseModel', '$window'];
 })(angular);