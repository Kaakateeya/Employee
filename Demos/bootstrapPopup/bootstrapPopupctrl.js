 (function() {
     'use strict';

     function controller(bootstrapPopupModel) {
         /* jshint validthis:true */
         var vm = this;
         var model;
         vm.model = model = bootstrapPopupModel;
         vm.openPop = function() {
             model.showPopup = true;
         };
     }
     angular
         .module('Kaakateeya')
         .controller('bootstrapPopupCtrl', controller);
     controller.$inject = ['bootstrapPopupModel'];

 })();