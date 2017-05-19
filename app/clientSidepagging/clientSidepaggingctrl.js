 (function() {
     'use strict';

     function controller($location, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.filteredTodos = [], vm.currentPage = 1, vm.numPerPage = 10, vm.maxSize = 5;
         vm.makeTodos = function() {
             vm.todos = [];
             for (var i = 1; i <= 1000; i++) {
                 vm.todos.push({ text: 'todo ' + i, done: false });
             }
         };
         vm.makeTodos();
         scope.$watch('currentPage + numPerPage', function() {
             var begin = ((vm.currentPage - 1) * vm.numPerPage),
                 end = begin + vm.numPerPage;
             vm.filteredTodos = vm.todos.slice(begin, end);
         });
     }
     angular
         .module('Kaakateeya')
         .controller('clientSidepaggingCtrl', controller);
     controller.$inject = ['$location', '$scope'];
 })();