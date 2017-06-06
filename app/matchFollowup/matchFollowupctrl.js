 (function(angular) {
     'use strict';

     function controller(scope, matchFollowupModel, $rootScope) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = matchFollowupModel();
             model.scope = scope;
             model.templateUrl = "templates/matchFollowupSlide.html";
             model.headettemp = "templates/matchFollowupHeader.html";
             model.init();
             //  $rootScope.colorurl = 'matchColor';
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('matchFollowupCtrl', controller);
     controller.$inject = ['$scope', 'matchFollowupModel', '$rootScope'];
 })(angular);