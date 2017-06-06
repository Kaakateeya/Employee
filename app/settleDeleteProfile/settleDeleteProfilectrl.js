 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('settleDeleteProfileCtrl', controller)

     controller.$inject = ['settleDeleteProfileModel'];

     function controller(settleDeleteProfileModel) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = settleDeleteProfileModel();
             model.mainArray = model.SettleArray;
             model.settleType = '0';
             model.issendMail = 2;
             model.ProfileOwner = model.withProfileOwner = 'Owner name';

         };

         vm.init();

     }
 })();