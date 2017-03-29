 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('bootstrapTableCtrl', controller)

     controller.$inject = ['bootstrapTableModel', '$timeout'];

     function controller(bootstrapTableModel, timeout) {
         /* jshint validthis:true */
         var vm = this;
         var model;

         vm.init = function() {
             vm.model = model = bootstrapTableModel;
         };
         timeout(function() {
             vm.mg();
         }, 100)
         vm.mg = function() {;
             model.data = [
                 { 'ProfileID': 1, 'LastName': 'kusumuru', 'FirstName': 'Uma', 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 },
                 { 'ProfileID': 2, 'LastName': 'Anasuri', 'FirstName': 'Vinu', 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 },
                 { 'ProfileID': 2, 'LastName': 21071668, 'FirstName': 21071668, 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 }
             ];
         }
         vm.init();
     }
 })();