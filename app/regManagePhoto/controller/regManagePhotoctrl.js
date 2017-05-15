 (function(angular) {
     'use strict';

     function controller(regManagePhotoModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = regManagePhotoModel();
             vm.model.scope = scope;
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('regManagePhotoCtrl', controller);

     controller.$inject = ['regManagePhotoModel', '$scope', '$window'];
 })(angular);