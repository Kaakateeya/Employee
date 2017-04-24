 (function(angular) {
     'use strict';

     function controller(scope, matchFollowupModel) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = matchFollowupModel;
             model.scope = scope;
             model.templateUrl = "templates/matchFollowupSlide.html";
             model.headettemp = "templates/matchFollowupHeader.html";
             model.init();
         };

         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('matchFollowupCtrl', controller);
     controller.$inject = ['$scope', 'matchFollowupModel'];
 })(angular);