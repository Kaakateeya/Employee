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

             SelectBindServiceApp.getdecrypt(stateParams.ID).then(function(response) {
                 document.getElementById('iframe').setAttribute('src', app.GlobalImgPath + 'Images/HoroscopeImages/' + response.data + '_HaroscopeImage/' + response.data + '_HaroscopeImage.html');
                 vm.model = showHoroModel;
             });


         };

         vm.init();

     }
 })();