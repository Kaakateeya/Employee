 (function(angular) {
     'use strict';

     function controller(loginModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = loginModel();
             model.init();
         };
         vm.init();

     }

     angular.module('Kaakateeya').controller('loginCtrl', ['loginModel', '$scope', controller]);

 })(angular);