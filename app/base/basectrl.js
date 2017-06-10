 (function(angular) {
     'use strict';

     function controller(baseModel, scope, $state, stateParams) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             scope.model = model = baseModel;
             model.scope = scope;
             scope.model.init();
         };
         scope.redirect = function(type) {
             $state.go('base.' + type, { CustID: stateParams.CustID });
         };
         scope.backgroundcolor = function(status) {
             var color = '#EFEFEF';
             switch (status) {
                 case 54:
                     color = '#EFEFEF';
                     break;
                 case 55:
                     color = '#185615';
                     break;
                 case 56:
                 case 394:
                     color = '#BCC3BE';
                     break;
                 case 57:
                 case 393:
                     color = '#17F067';
                     break;
             }
             return color;
         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('baseCtrl', controller);

     controller.$inject = ['baseModel', '$scope', '$state', '$stateParams'];
 })(angular);