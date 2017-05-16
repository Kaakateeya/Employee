 (function(angular) {
     'use strict';

     function controller(editProfileSettingModel, scope, window) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = editProfileSettingModel.init();
             vm.model.scope = scope;
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('editProfileSettingCtrl', controller);

     controller.$inject = ['editProfileSettingModel', '$scope', '$window'];
 })(angular);