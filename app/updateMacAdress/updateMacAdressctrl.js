 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('updateMacAdressCtrl', controller);

     controller.$inject = ['updateMacAdressModel', '$scope', 'authSvc'];

     function controller(updateMacAdressModel, scope, authSvc) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = updateMacAdressModel;
             vm.model.region = '';
             vm.model.scope = scope;
             vm.model.Admin = authSvc.isAdmin();
             _.map(model.sdata, function(item) {
                 item.optionType = 'label';
             });
         };

         vm.init();
     }
 })();