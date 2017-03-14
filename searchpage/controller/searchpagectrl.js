 (function(angular) {
     'use strict';

     function controller(scope, searchpageModel, Commondependency, alerts) {
         /* jshint validthis:true */
         var vm = this,
             model;
         vm.init = function() {
             vm.model = model = searchpageModel;
             model.scope = scope;
             alerts.dynamicpopup("profileidpopupsubmit.html", scope, 'md');

         };
         scope.$on('directivechangeevent', function(event, modal, type) {
             switch (type) {
                 case 'Country':
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
                 case 'educationspeciallisation':
                     model.educationspeciallisation = [];
                     model.educationspeciallisation = Commondependency.educationSpeciakisationBind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
                     break;
                 case 'caste':
                     model.Caste = [];
                     model.Caste = Commondependency.casteDepedency(model.generalsearch.Religion, ((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : ""));
                     break;
                 case 'casteadvance':
                     model.Caste = [];
                     model.Caste = Commondependency.casteDepedency(model.advancedsearch.advancedReligion, ((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : ""));
                     break;
                 case 'professionBind':
                     model.professionBind = [];
                     model.professionBind = Commondependency.professionBind((modal !== undefined && modal !== null && model !== "") ? (modal).toString() : "");
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
         vm.submitgeneral = function(object) {
             model.submitgeneral(object, 1, 10);
         };
         vm.submitadvancedsearch = function(object) {
             model.submitadvancedsearch(object, 1, 10);
         };
         scope.$on('slideshowsubmit', function(event, frompage, topage, tablename) {
             debugger;
             switch (tablename) {
                 case "general":
                     model.submitgeneral(model.CgetDetails, frompage, topage);
                     break;
                 case "advanced":
                     model.submitadvancedsearch(model.CgetDetails, frompage, topage);
                     break;
             }

         });
         vm.init();
     }

     angular
         .module('Kaakateeya')
         .controller('searchpageCtrl', ['$scope', 'searchpageModel', 'Commondependency', 'alert', controller]);
 })(angular);