 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('showHoroCtrl', controller);

     controller.$inject = ['showHoroModel', 'SelectBindServiceApp', '$stateParams', '$scope', '$http'];

     function controller(showHoroModel, SelectBindServiceApp, stateParams, scope, http) {
         /* jshint validthis:true */
         var vm = this,
             decryptCustid;

         vm.init = function() {
             scope.imagefile = 'C:\Employee\Images\HoroscopeImages\91022_HaroscopeImage\91022_HaroscopeImage.html';
             SelectBindServiceApp.getdecrypt(stateParams.ID).then(function(response) {
                 document.getElementById('iframe').setAttribute('src', 'http://s3.ap-south-1.amazonaws.com/kaakateeyaprod/Images/HoroscopeImages/' + response.data + '_HaroscopeImage/' + response.data + '_HaroscopeImage.html');
                 vm.model = showHoroModel;
             });


         };

         vm.init();

     }
 })();