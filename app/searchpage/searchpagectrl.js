 (function(angular) {
     'use strict';
     angular
         .module('Kaakateeya')
         .controller('searchpageCtrl', ['$scope', 'searchpageModel', 'Commondependency', 'alert', '$stateParams', '$timeout', function(scope, searchpageModel, Commondependency, alerts, $stateParams, timeout) {
             /* jshint validthis:true */
             var vm = this,
                 model;
             vm.init = function() {
                 vm.model = model = {};
                 vm.model = model = searchpageModel.pageload(scope);
                 model.agedobcontrol = '2';
                 model.templateUrl = "templates/angularSlide.html";
                 model.config.headettemp = "templates/angularHeader.html";
                 scope.$on("$destroy", vm.destroy);
             };
             vm.destroy = function() {
                 model.destroy();
             };
             vm.directivechangeevent = function(modal, type) {
                 switch (type) {
                     case 'state':
                         model.State = [];
                         model.State = Commondependency.StateBind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                         break;
                     case 'district':
                         model.DistrictBind = [];
                         model.DistrictBind = Commondependency.districtBind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                         break;
                     case 'city':
                         model.cityBind = [];
                         model.cityBind = Commondependency.cityBind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                         break;
                     case 'EducationCatgory':
                         model.Educationgroup = [];
                         model.Educationgroup = Commondependency.educationGroupBind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                         break;
                     case 'educationGroup':
                         model.educationspeciallisation = [];
                         model.educationspeciallisation = Commondependency.educationSpeciakisationBind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                         break;
                     case 'caste':
                         model.Caste = [];
                         model.Caste = Commondependency.casteDepedency((model.ReligionID !== undefined && model.ReligionID !== null && model.ReligionID.length > 0 ? (model.ReligionID).toString() : ""), ((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : ""));
                         break;
                     case 'professionBind':
                         model.professionBind = [];
                         model.professionBind = Commondependency.professionspecialisationBind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                         break;
                     case 'star':
                         model.stars = [];
                         model.stars = Commondependency.starBind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                         break;
                     case 'BranchName':
                         model.BranchName = [];
                         model.BranchName = Commondependency.branch((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                         break;
                 }
             };


             vm.onTabSelected = function(value) {
                 if (value === 1) {
                     alerts.dynamicpopup("profileidpopupsubmit.html", scope, 'md', "modalclass");
                     model.searchpopuptext = "Advanced Search";
                     model.ProfileIDpopup = '';
                     model.domsearches();

                 } else {
                     alerts.dynamicpopup("profileidpopupsubmit.html", scope, 'md', "modalclass");
                     model.searchpopuptext = "General Search";
                     model.ProfileIDpopup = '';
                     model.domsearches();
                 }
             };
             vm.init();
         }]);
 })(angular);