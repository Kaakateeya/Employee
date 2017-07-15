 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('ticketCreationCtrl', ['ticketCreationModel', '$scope',
             function(ticketCreationModel, scope) {
                 /* jshint validthis:true */
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = ticketCreationModel;
                     model.opendiv = true;
                     model.rbtntype = '0';
                     model.scope = scope;
                     model.personalname = false;
                     model.clearallcontrols();

                 };
                 vm.init();
             }
         ]);
 })();