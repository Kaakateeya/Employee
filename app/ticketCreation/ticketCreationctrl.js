 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('ticketCreationCtrl', ['ticketCreationModel', function controller(ticketCreationModel) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = ticketCreationModel;
                 model.opendiv = true;
                 model.rbtntype = '0';
             };
             vm.init();
         }]);
 })();