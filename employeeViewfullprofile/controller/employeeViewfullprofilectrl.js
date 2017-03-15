 (function() {
     'use strict';

     angular
         .module('module')
         .controller('employeeViewfullprofileCtrl', controller)

     controller.$inject = ['$location'];

     function controller($location) {
         /* jshint validthis:true */
         var vm = this;

         activate();

         function activate() {}
     }
 })();