 (function(angular) {
     'use strict';

     function controller(scope, matchFollowupModel) {
         /* jshint validthis:true */
         var vm = this,
             model;

         vm.init = function() {
             vm.model = model = matchFollowupModel;
             model.scope = scope;
             model.init();
         };
         scope.$on('directivechangeevent', function(event, modal, type) {
             switch (type) {
                 case 'BranchName':
                     model.BranchName = [];
                     model.BranchName = Commondependency.BranchNamebind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                     break;
             }
         });
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('matchFollowupCtrl', controller);
     controller.$inject = ['$scope', 'matchFollowupModel'];
 })(angular);