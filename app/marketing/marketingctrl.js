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
                 model.EmpNamesArr = [];
                 model.templateUrl = "templates/marketingSlide.html";
                 model.config.headettemp = "templates/marketingSlideHeader.html";
                 scope.$on("$destroy", vm.destroy);
                 model.isDisabledsubmit = false;
             };
             vm.destroy = function() {
                 model.destroy();
             };
             vm.init();
         }]);
 })(angular);