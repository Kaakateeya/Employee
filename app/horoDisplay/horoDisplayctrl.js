 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('horoDisplayCtrl', controller);

     controller.$inject = ['SelectBindServiceApp', '$location'];

     function controller(SelectBindServiceApp, $location) {
         /* jshint validthis:true */
         var vm = this,
             decryptCustid;
         vm.searchObjectquery = $location.search();
         var meKey = Object.getOwnPropertyNames(vm.searchObjectquery)[0];
         var meKeyempid = Object.getOwnPropertyNames(vm.searchObjectquery)[1];
         vm.selfProfileID = vm.searchObjectquery[meKey].replace(' ', '+');
         vm.init = function() {
             SelectBindServiceApp.getdecrypt(vm.selfProfileID).then(function(response) {
                 document.getElementById('iframe').setAttribute('src', app.GlobalImgPathforimage + 'Images/HoroscopeImages/' + response.data + '_HaroscopeImage/' + response.data + '_HaroscopeImage.html');
             });
         };
         vm.init();

     }
 })();