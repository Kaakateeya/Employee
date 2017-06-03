 (function() {
     'use strict';

     function controller(scope, viewsettlementmodel) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             model = {};
             vm.model = model = viewsettlementmodel;
             model.settlementimage = "";
             model.scope = scope;
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('viewSettlementformCtrl', controller);

     controller.$inject = ['$scope', 'viewSettlementformModel'];
 })();