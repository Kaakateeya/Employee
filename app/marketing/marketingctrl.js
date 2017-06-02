 (function() {
     'use strict';

     function controller(marketingModel, scope, myFactory) {
         var vm = this;
         vm.init = function() {
             vm.model = marketingModel();
             vm.model.scope = scope;
         };
         this.title = 'testttttttt';

         myFactory.setTitle('testtttt');
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('marketingCtrl', controller)
     controller.$inject = ['marketingModel', '$scope', 'myFactory'];
 })(angular);