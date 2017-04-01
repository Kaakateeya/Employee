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
             var array = [
                 { records: 200, rowtype: 'alert alert-warning', custId: 71667, 'ProfileID': 1, 'LastName': 'kusumuru', 'FirstName': 'Uma', 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 },
                 { rowtype: 'alert alert-primary', custId: 71668, 'ProfileID': 2, 'LastName': 'Anasuri', 'FirstName': 'Vinu', 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 },
                 { rowtype: 'alert alert-danger', custId: 71669, 'ProfileID': 2, 'LastName': 21071668, 'FirstName': 21071668, 'Caste': 21071668, 'ProfileOwner': 21071668, 'Height': 21071668, 'Login': 21071668, 'Education': 21071668, 'Profession': 21071668, 'DOB': 21071668, 'ProfileID': 21071668 }
             ];
             model.setData(array);
         }

         vm.init();
     }
 })();