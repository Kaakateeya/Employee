// (function() {
//     'use strict';

//     angular
//         .module('Kaakateeya')
//         .directive('requireDir', directive);

//     directive.$inject = ['$window', '$compile'];

//     function directive($window, $compile) {
//         // Usage:
//         //     <directive></directive>
//         // Creates:
//         //
//         var directive = {
//             require: '^form',
//             link: link,
//             restrict: 'EA'

//         };
//         return directive;

//         function link(scope, element, attrs, formCtrl) {

//             var status = 'required' in attrs;
//             var inputName = element.attr('name');
//             var contentTr;
//             scope.$watch(function() {
//                 debugger;
//                 return formCtrl.$submitted;
//                 //formCtrl[inputName].$invalid;
//             }, function(oldval, newval) {
//                 debugger;
//                 if (status && formCtrl[inputName].$invalid && formCtrl.$submitted) {
//                     contentTr = angular.element('<span id="req">field is required..........</span>');
//                     contentTr.insertAfter(element);
//                     contentTr.css('color', 'red');
//                     $compile(contentTr)(scope);
//                 } else {
//                     if (contentTr)
//                         contentTr.remove();
//                 }
//             });

//             // scope.$on('form:submit', function() {
//             //     alert(111);
//             //     formCtrl.$setPristine();
//             // });

//         }
//     }

// })();