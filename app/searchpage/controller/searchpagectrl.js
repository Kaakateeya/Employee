 (function(angular) {
     'use strict';

     function controller(scope, searchpageModel, Commondependency, alerts, $stateParams, modelpopupopenmethod) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = searchpageModel;
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
             model.searchpopuptext = model.selectedIndex === "0" ? "General Search" : "Advance Search";
             alerts.dynamicpopup("profileidpopupsubmit.html", scope, 'md', "modalclass", 'searchpageCtrl');
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
                     model.BranchName = Commondependency.Branmodel.ProfileIDpopupchNamebind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                     break;
             }
         });
         vm.clearSelection = function(Arr) {
             _.each(model.domDatageneral, function(parentItem) {
                 _.each(parentItem.controlList, function(item) {
                     if (model[item.ngModel] !== undefined) {
                         model[item.ngModel] = undefined;
                     }
                 });
             });
             model.HeightFromID = "";
             model.HeightToID = "";
             model.AgeFromID = "0";
             model.AgeToID = "0";
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
             model.Showinprofile = model.arrayToString("1");
             model.ApplicationstatusID = model.arrayToString("54");
             model.MothertongueID = model.arrayToString("1");
             model.ReligionID = model.arrayToString("1");
             model.Caste = Commondependency.casteDepedency(model.ReligionID, model.MothertongueID);
         };

         vm.init();
         scope.$on("backsearchshowcontrols", function(event) {
             model.divcontrolls = true;
             model.slideshowtrue = false;
         });
     }
     angular
         .module('Kaakateeya')
         .controller('searchpageCtrl', ['$scope', 'searchpageModel', 'Commondependency', 'alert', '$stateParams', 'modelpopupopenmethod', controller]);
 })(angular);