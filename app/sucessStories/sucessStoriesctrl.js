 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('sucessStoriesCtrl', ['sucessStoriesModel', '$scope',
             function(sucessStoriesModel, scope) {
                 /* jshint validthis:true */
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = sucessStoriesModel;
                     model.panelbodyhide = true;
                     model.scope = scope;
                 };
                 vm.init();
             }
         ]);
 })();