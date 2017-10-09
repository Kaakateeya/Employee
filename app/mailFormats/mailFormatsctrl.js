 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('mailFormatsCtrl', controller);

     controller.$inject = ['mailFormatsModel', '$scope'];

     function controller(mailFormatsModel, scope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = mailFormatsModel;
             model.typeofDiv = 'emailVerify';
             model.scope = scope;
         };

         vm.init();

     }
 })();