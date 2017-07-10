 (function() {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('marketingCtrl', ['$scope', 'marketingModel', function(scope, marketingModel) {
             var vm = this,
                 model;


             vm.init = function() {

                 vm.model = model = marketingModel.init();

                 model.scope = scope;
                 model.templateUrl = "templates/marketingSlide.html";
                 model.config.headettemp = "templates/marketingSlideHeader.html";
                 scope.$on("$destroy", vm.destroy);
             };




             vm.destroy = function() {
                 model.destroy();
             };
             vm.init();
         }]);
 })(angular);