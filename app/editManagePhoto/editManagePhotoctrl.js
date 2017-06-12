 (function(angular) {
     'use strict';

     function controller(editManagePhotoModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editManagePhotoModel;
             editManagePhotoModel.init();
             vm.model.scope = scope;
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editManagePhotoCtrl', controller);
     controller.$inject = ['editManagePhotoModel', '$scope', '$window'];
 })(angular);