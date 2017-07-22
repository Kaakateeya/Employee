 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('emailbounceEntryformCtrl', ['emailbounceEntryformModel', '$scope',
             function(emailbounceEntryformModel, scope) {
                 /* jshint validthis:true */
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = emailbounceEntryformModel;
                     model.scope = scope;
                 };
                 vm.init();
             }
         ]);
 })();