 (function(angular) {
     'use strict';

     function controller(loginModel, scope) {
         /* jshint validthis:true */
         var vm = this;

         vm.activate = function() {

             loginModel.showpopup('loginContent.html', scope);
         }
         vm.activate();

         scope.closepopup = function() {
             loginModel.closepopup();
         }

     }

     angular.module('Kaakateeya').controller('loginCtrl', ['loginModel', '$scope', controller]);

 })(angular);