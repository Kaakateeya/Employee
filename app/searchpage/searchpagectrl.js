 (function(angular) {
     'use strict';

     function controller(scope, searchpageModel, Commondependency, alerts, $stateParams, modelpopupopenmethod, timeout) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = searchpageModel();
             model.scope = scope;
             model.ProfileIDpopup = "";
             model.divcontrollsbind = 0;
             model.divcontrolls = true;
             model.headervisileble = false;
             model.slideshowtrue = false;
             model.sidebarnavshow = true;
             model.activatedmobile = true;
             model.templateUrl = "templates/angularSlide.html";
             model.headettemp = "templates/angularHeader.html";
             model.selectedIndex = $stateParams.id;
             if (parseInt($stateParams.Profileid) !== 0) {
                 model.ProfileIDpopup = $stateParams.Profileid;
             }
             alerts.dynamicpopup("profileidpopupsubmit.html", scope, 'md', "modalclass", 'searchpageCtrl');
             vm.clearSelection(model.selectedIndex === "0" ? model.domDatageneral : model.domDataadvanced);
             model.searchpopuptext = model.selectedIndex === "0" ? "General Search" : "Advance Search";
         };
         scope.$on('directivechangeevent', function(event, modal, type) {
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
         });
         vm.clearSelection = function(Arr) {
             timeout(function() {
                 _.each(Arr, function(parentItem) {
                     _.each(parentItem.controlList, function(item) {
                         if (model[item.ngModel] !== undefined) {
                             model[item.ngModel] = undefined;
                         }
                         if (model[item.ngModelFrom] !== undefined) {
                             model[item.ngModelFrom] = undefined;
                         }
                         if (model[item.ngModelTo] !== undefined) {
                             model[item.ngModelTo] = undefined;
                         }
                     });

                 });
                 model.HeightFromID = "";
                 model.HeightToID = "";
                 model.AgeFromID = "0";
                 model.AgeToID = "0";
                 model.Showinprofile = model.arrayToString("1");
                 model.ApplicationstatusID = model.arrayToString("54");
                 model.MothertongueID = model.arrayToString("1");
                 model.ReligionID = model.arrayToString("1");
                 model.Caste = Commondependency.casteDepedency(model.ReligionID, model.MothertongueID);
             }, 1000);
         };

         vm.onTabSelected = function(value) {
             if (value === 1) {
                 vm.clearSelection(model.domDataadvanced);
                 model.searchpopuptext = "Advanced Search";
                 model.ProfileIDpopup = '';
                 alerts.dynamicpopup("profileidpopupsubmit.html", scope, 'md', "modalclass");
             } else {
                 vm.clearSelection(model.domDatageneral);
                 model.searchpopuptext = "General Search";
                 model.ProfileIDpopup = '';
                 alerts.dynamicpopup("profileidpopupsubmit.html", scope, 'md', "modalclass");
             }

         };
         vm.init();
     }
     angular
         .module('Kaakateeya')
         .controller('searchpageCtrl', ['$scope', 'searchpageModel', 'Commondependency', 'alert', '$stateParams', 'modelpopupopenmethod', '$timeout', controller]);
 })(angular);