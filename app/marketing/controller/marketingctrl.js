 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('marketingCtrl', controller)

     controller.$inject = ['$location'];

     function controller($location) {
         /* jshint validthis:true */
         var vm = this;

         activate();

         function activate() {}
     }
 })();