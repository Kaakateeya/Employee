 (function() {
     'use strict';

     function controller($location) {
         /* jshint validthis:true */
         var vm = this;

         function activate() {}
         activate();
     }
     angular
         .module('Kaakateeya')
         .controller('bootstrapSlideCtrl', controller);
     controller.$inject = ['$location'];
 })();