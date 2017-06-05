 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('uploadSettlementFormCtrl', controller);

     controller.$inject = ['uploadSettlementFormModel', '$scope'];

     function controller(uploadSettlementFormModel, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.init = function() {
             vm.model = uploadSettlementFormModel();
             vm.model.typeOfReference = '';
             vm.model.txtProfileID = '';
             vm.model.rdnSignIn = '';
             vm.model.scope = scope;
         };

         vm.init();
     }
 })();