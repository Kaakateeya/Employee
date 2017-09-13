 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('showHoroCtrl', controller)

     controller.$inject = ['showHoroModel'];

     function controller(showHoroModel) {
         /* jshint validthis:true */
         var vm = this;

         vm.init = function() {
             //  vm.url = 'http://kaakateeya.com/access/Images/HoroscopeImages/91035_HaroscopeImage/91035_HaroscopeImage.html';
             //  $('#iframe').attr('src', 'http://kaakateeya.com/access/Images/HoroscopeImages/91035_HaroscopeImage/91035_HaroscopeImage.html');
             document.getElementById('iframe').setAttribute('src', 'http://kaakateeya.com/access/Images/HoroscopeImages/91035_HaroscopeImage/91035_HaroscopeImage.html');
             vm.model = showHoroModel;

         };

         vm.init();

     }
 })();