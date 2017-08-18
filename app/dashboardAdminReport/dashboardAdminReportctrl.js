 (function() {
     'use strict';

     angular
         .module('Kaakateeya')
         .controller('dashboardAdminReportCtrl', ['dashboardAdminReportModel', '$scope',
             function(dashboardAdminReportModel, scope) {
                 /* jshint validthis:true */
                 var vm = this,
                     model;
                 vm.init = function() {
                     vm.model = model = dashboardAdminReportModel;
                     model.scope = scope;

                     model.charts = {
                         //  "caption": "Comparison of Work Sheet",
                         // "subCaption": "Last year Vs This year",
                         "xAxisname": "Type Of Profiles",
                         "yAxisName": "No. of Profiles",
                         //  "numberPrefix": "$",
                         "plotFillAlpha": "80",
                         //Cosmetics
                         "paletteColors": "#0075c2,#1aaf5d,#e06c0d,#730caf,#d18ae2",
                         "baseFontColor": "#333333",
                         "baseFont": "Helvetica Neue,Arial",
                         "captionFontSize": "14",
                         "subcaptionFontSize": "14",
                         "subcaptionFontBold": "0",
                         "showBorder": "0",
                         "bgColor": "#ffffff",
                         "showShadow": "0",
                         "canvasBgColor": "#ffffff",
                         "canvasBorderAlpha": "0",
                         "divlineAlpha": "100",
                         "divlineColor": "#999999",
                         "divlineThickness": "1",
                         "divLineIsDashed": "1",
                         "divLineDashLen": "1",
                         "divLineGapLen": "1",
                         "usePlotGradientColor": "0",
                         "showplotborder": "0",
                         "valueFontColor": "#ffffff",
                         "placeValuesInside": "1",
                         "showHoverEffect": "1",
                         "rotateValues": "1",
                         "showXAxisLine": "1",
                         "xAxisLineThickness": "1",
                         "xAxisLineColor": "#999999",
                         "showAlternateHGridColor": "0",
                         //  "legendBgAlpha": "0",
                         //  "legendBorderAlpha": "0",
                         //"legendShadow": "0",
                         "legendItemFontSize": "10",
                         "legendItemFontColor": "#666666",
                         //

                         "legendBgColor": "#CCCCCC",
                         "legendBgAlpha": "20",
                         "legendBorderColor": "#666666",
                         "legendBorderThickness": "1",
                         "legendBorderAlpha": "40",
                         "legendShadow": "1"
                     };
                     model.categiries = [{
                         "category": [{
                             "label": "AC"
                         }, {
                             "label": "IC"
                         }, {
                             "label": "PaidC"
                         }, {
                             "label": "UNPC"
                         }, {
                             "label": "Nophoto"
                         }, {
                             "label": "Nohoro"
                         }]
                     }];

                     model.reports();


                 };
                 vm.init();
             }
         ]);
 })();