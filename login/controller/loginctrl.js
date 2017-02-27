 (function() {
     'use strict';



     function controller($location) {
         /* jshint validthis:true */
         var vm = this;

         activate();

         function activate() {}
     }
     angular
         .module('Kaakateeya')
         .controller('loginCtrl', controller)

     controller.$inject = ['$location'];
 })();