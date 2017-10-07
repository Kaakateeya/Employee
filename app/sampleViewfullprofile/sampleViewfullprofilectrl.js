 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('sampleViewfullprofileCtrl', controller);

     controller.$inject = ['sampleViewfullprofileModel', '$scope', '$stateParams'];

     function controller(sampleViewfullprofileModel, scope, stateParams) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = sampleViewfullprofileModel;
             model.scope = scope;
             model.stateparamid = stateParams.id;
             model.init(model.stateparamid);
         };

         vm.init();

     }
 })();