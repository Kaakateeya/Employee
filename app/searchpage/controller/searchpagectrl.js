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
             model.tickethistory = "templates/ticketHistoryPopup.html";
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
                     model.BranchName = Commondependency.BranchNamebind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                     break;
             }
         });
         vm.onTabSelected = function(value) {
             if (value === 1) {
                 model.searchpopuptext = "Advanced Search";
                 alerts.dynamicpopup("profileidpopupsubmit.html", scope, 'md', "modalclass");
             } else {
                 model.searchpopuptext = "General Search";
                 alerts.dynamicpopup("profileidpopupsubmit.html", scope, 'md', "modalclass");
             }
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