 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('expressInterestCtrl', controller)

     controller.$inject = ['$location', '$scope'];

     function controller($location, scope) {
         /* jshint validthis:true */
         var vm = this;
         vm.users = [
             { name: 'aaaaa', selected: true },
             { name: 'bbbbb', selected: false },
             { name: 'ccccc', selected: false },
             { name: 'ddddd', selected: false }
         ];

         vm.teams = [
             { name: "Red", id: 0, isChecked: true },
             { name: "Blue", id: 1, isChecked: false },
             { name: "Green", id: 2, isChecked: true },
             { name: "Yellow", id: 3, isChecked: true },
             { name: "Orange", id: 4, isChecked: false },
             { name: "Purple", id: 5, isChecked: true }
         ];


     }
 })();