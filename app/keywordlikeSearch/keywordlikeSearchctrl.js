 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('keywordlikeSearchCtrl', ['keywordlikeSearchModel', '$scope',
             function(keywordlikeSearchModel, scope) {
                 /* jshint validthis:true */
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = keywordlikeSearchModel;
                     model.scope = scope;
                 };
                 vm.init();
             }
         ]);
 })();