 (function(angular) {
     'use strict';

     function controller(editPartnerpreferenceModel, scope, window, modelpopupopenmethod) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             window.scrollTo(0, 0);
             vm.model = model = editPartnerpreferenceModel.init();
             vm.model.scope = scope;
         };

         vm.init();

     }
     angular
         .module('Kaakateeya')
         .controller('editPartnerpreferenceCtrl', controller);

     controller.$inject = ['editPartnerpreferenceModel', '$scope', '$window', 'modelpopupopenmethod'];
 })(angular);