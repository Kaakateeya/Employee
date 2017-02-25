 (function() {
     'use strict';

     angular
         .module('module')
         .controller('parametervalueCtrl', controller)

     controller.$inject = ['$location'];

     function controller($location) {
         /* jshint validthis:true */
         var vm = this;

         activate();

         function activate() {}
     }
 })();