 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('settleDeleteProfileCtrl', controller)

     controller.$inject = ['settleDeleteProfileModel', '$scope'];

     function controller(settleDeleteProfileModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = settleDeleteProfileModel();
             model.mainArray = model.SettleArray;
             model.settleType = '0';
             model.issendMail = 2;
             model.fromProfileOwner = model.toProfileOwner = 'Owner name';
             model.scope = scope;
         };

         vm.init();

     }
 })();