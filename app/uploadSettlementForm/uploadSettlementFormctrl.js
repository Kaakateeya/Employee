 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('uploadSettlementFormCtrl', controller)

     controller.$inject = ['uploadSettlementFormModel'];

     function controller(uploadSettlementFormModel) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = uploadSettlementFormModel;
             vm.model.typeOfReference = '';
         };

         vm.init();
     }
 })();