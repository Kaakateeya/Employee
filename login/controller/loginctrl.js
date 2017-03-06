 (function(angular) {
     'use strict';

     function controller(loginModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.activate = function() {
             vm.model = model = loginModel;
             model.showpopup('loginContent.html', scope);
         };
         vm.activate();

     }

     angular.module('Kaakateeya').controller('loginCtrl', ['loginModel', '$scope', controller]);

 })(angular);