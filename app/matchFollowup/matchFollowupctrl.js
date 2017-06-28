 (function(angular) {
     'use strict';


     angular
         .module('Kaakateeya')
         .controller('matchFollowupCtrl', ['$scope', 'matchFollowupModel', '$rootScope', function(scope, matchFollowupModel, $rootScope) {
             /* jshint validthis:true */
             var vm = this,
                 model;

             vm.init = function() {
                 vm.model = model = matchFollowupModel.init();
                 model.slides = [];
                 model.scope = scope;
                 model.templateUrl = "templates/matchFollowupSlide.html";
                 model.config.headettemp = "templates/matchFollowupHeader.html";
                 //  $rootScope.colorurl = 'matchColor';
                 scope.$on("$destroy", vm.destroy);
             };
             vm.destroy = function() {
                 model.destroy();
             };

             vm.init();
         }]);

 })(angular);