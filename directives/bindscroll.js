// (function() {
//     'use strict';

//     angular
//         .module('Kaakateeya')
//         .directive('scroll', directive);

//     directive.$inject = ['$window'];

//     function directive($window) {
//         // Usage:
//         //     <directive></directive>
//         // Creates:
//         //
//         var directive = {
//             link: link,
//             restrict: 'EA'
//         };
//         return directive;

//         function link(scope, element, attrs) {


//             element.bind("scroll", function() {

//                 MakeStaticHeader('gridID', 200, 1250, 30, false);
//                 scope.$apply();
//             });

//             function MakeStaticHeader(gridId, height, width, headerHeight, isFooter) {
//                 var tbl = document.getElementById(gridId);
//                 if (tbl) {
//                     var DivHR = document.getElementById('DivHeaderRow');
//                     var DivMC = document.getElementById('DivMainContent');
//                     var DivFR = document.getElementById('DivFooterRow');

//                     //*** Set divheaderRow Properties ****
//                     DivHR.style.height = headerHeight + 'px';
//                     DivHR.style.width = (parseInt(width) - 16) + 'px';
//                     DivHR.style.position = 'relative';
//                     DivHR.style.top = '0px';
//                     DivHR.style.zIndex = '10';
//                     DivHR.style.verticalAlign = 'top';

//                     //*** Set divMainContent Properties ****
//                     DivMC.style.width = width + 'px';
//                     DivMC.style.height = height + 'px';
//                     DivMC.style.position = 'relative';
//                     DivMC.style.top = -headerHeight + 'px';
//                     DivMC.style.zIndex = '1';

//                     //*** Set divFooterRow Properties ****
//                     DivFR.style.width = (parseInt(width) - 16) + 'px';
//                     DivFR.style.position = 'relative';
//                     DivFR.style.top = -headerHeight + 'px';
//                     DivFR.style.verticalAlign = 'top';
//                     DivFR.style.paddingtop = '2px';

//                     if (isFooter) {
//                         var tblfr = tbl.cloneNode(true);
//                         tblfr.removeChild(tblfr.getElementsByTagName('tbody')[0]);
//                         var tblBody = document.createElement('tbody');
//                         tblfr.style.width = '100%';
//                         tblfr.cellSpacing = "0";
//                         tblfr.border = "0px";
//                         tblfr.rules = "none";
//                         //*****In the case of Footer Row *******
//                         tblBody.appendChild(tbl.rows[tbl.rows.length - 1]);
//                         tblfr.appendChild(tblBody);
//                         DivFR.appendChild(tblfr);
//                     }
//                     //****Copy Header in divHeaderRow****
//                     DivHR.appendChild(tbl.cloneNode(true));
//                 }
//             }

//         }
//     }

// })();