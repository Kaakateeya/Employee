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
                     model.dataSource1 = {
                         "chart": {
                             "caption": "Column Chart Built in Angular!",
                             "captionFontSize": "10",
                             subCaption: "Top 5 stores in last month by revenue",
                             //  numberPrefix: "$",
                             theme: "ocean"
                         },
                         "data": [{
                                 "label": "CornflowerBlue",
                                 "value": "420000"

                             },
                             {
                                 "label": "red",
                                 "value": "700000"
                             },
                         ]
                     };
                     //

                     model.attrs = {

                         "caption": "Sales Comparison: 2013 versus 2014",
                         "subCaption": "Harry’ s SuperMart",
                         // "numberprefix": "",
                         "plotgradientcolor": "",
                         "bgcolor": "FFFFFF",
                         "showalternatehgridcolor": "0",
                         "divlinecolor": "CCCCCC",
                         "showvalues": "0",
                         "showcanvasborder": "0",
                         "canvasborderalpha": "0",
                         "canvasbordercolor": "CCCCCC",
                         "canvasborderthickness": "1",
                         "yaxismaxvalue": "30000",
                         "captionpadding": "30",
                         "linethickness": "3",
                         "yaxisvaluespadding": "15",
                         "legendshadow": "0",
                         "legendborderalpha": "0",
                         "palettecolors": "#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78",
                         "showborder": "0"
                     };

                     model.categories = [{
                         "category": [{
                             "label": "7 days"
                         }, {
                             "label": "30 days"
                         }, {
                             "label": "45 days"
                         }]
                     }];

                     model.dataset = [{
                             "seriesname": "horoscope",
                             "data": [{
                                 "value": "8000"
                             }, {
                                 "value": "300"
                             }, {
                                 "value": "21800"
                             }, {
                                 "value": "21800"
                             }, {
                                 "value": "24600"
                             }, {
                                 "value": "27600"
                             }, {
                                 "value": "26800"
                             }, {
                                 "value": "27700"
                             }, {
                                 "value": "23700"
                             }, {
                                 "value": "25900"
                             }, {
                                 "value": "26800"
                             }, {
                                 "value": "24800"
                             }]
                         },

                         {
                             "seriesname": "setteled",
                             "data": [{
                                 "value": "10000"
                             }, {
                                 "value": "11500"
                             }, {
                                 "value": "12500"
                             }, {
                                 "value": "15000"
                             }, {
                                 "value": "16000"
                             }, {
                                 "value": "17600"
                             }, {
                                 "value": "18800"
                             }, {
                                 "value": "19700"
                             }, {
                                 "value": "21700"
                             }, {
                                 "value": "21900"
                             }, {
                                 "value": "22900"
                             }, {
                                 "value": "20800"
                             }]
                         },
                         {
                             "seriesname": "deleted",
                             "data": [{
                                 "value": "10000"
                             }, {
                                 "value": "11500"
                             }, {
                                 "value": "12500"
                             }, {
                                 "value": "15000"
                             }, {
                                 "value": "16000"
                             }, {
                                 "value": "17600"
                             }, {
                                 "value": "18800"
                             }, {
                                 "value": "19700"
                             }, {
                                 "value": "21700"
                             }, {
                                 "value": "21900"
                             }, {
                                 "value": "22900"
                             }, {
                                 "value": "20800"
                             }]
                         },
                         {
                             "seriesname": "waiting",
                             "data": [{
                                 "value": "2000"
                             }, {
                                 "value": "10"
                             }, {
                                 "value": "80"
                             }, {
                                 "value": "1"
                             }, {
                                 "value": "30"
                             }, {
                                 "value": "40"
                             }, {
                                 "value": "100"
                             }, {
                                 "value": "500"
                             }, {
                                 "value": "400"
                             }, {
                                 "value": "598"
                             }, {
                                 "value": "310"
                             }, {
                                 "value": "890"
                             }]
                         }
                     ];

                     //
                     model.dataSource = {
                         "chart": {
                             "caption": "Monthly revenue for last year",
                             "subCaption": "Harry's SuperMart",
                             "xAxisName": "Month",
                             "yAxisName": "Revenues (In USD)",
                             "numberPrefix": "$",
                             "paletteColors": "#0075c2",
                             "bgColor": "#ffffff",
                             "borderAlpha": "20",
                             "canvasBorderAlpha": "0",
                             "usePlotGradientColor": "0",
                             "plotBorderAlpha": "10",
                             "placevaluesInside": "1",
                             "rotatevalues": "1",
                             "valueFontColor": "#ffffff",
                             "showXAxisLine": "1",
                             "xAxisLineColor": "#999999",
                             "divlineColor": "#999999",
                             "divLineIsDashed": "1",
                             "showAlternateHGridColor": "0",
                             "subcaptionFontBold": "0",
                             "subcaptionFontSize": "14"
                         },
                         "data": [{
                                 "label": "Jan",
                                 "value": "420000"
                             },
                             {
                                 "label": "Feb",
                                 "value": "810000"
                             },
                             {
                                 "label": "Mar",
                                 "value": "720000"
                             },
                             {
                                 "label": "Apr",
                                 "value": "550000"
                             },
                             {
                                 "label": "May",
                                 "value": "910000"
                             },
                             {
                                 "label": "Jun",
                                 "value": "510000"
                             },
                             {
                                 "label": "Jul",
                                 "value": "680000"
                             },
                             {
                                 "label": "Aug",
                                 "value": "620000"
                             },
                             {
                                 "label": "Sep",
                                 "value": "610000"
                             },
                             {
                                 "label": "Oct",
                                 "value": "490000"
                             },
                             {
                                 "label": "Nov",
                                 "value": "900000"
                             },
                             {
                                 "label": "Dec",
                                 "value": "730000"
                             }
                         ],
                         "trendlines": [{
                             "line": [{
                                 "startvalue": "700000",
                                 "color": "#1aaf5d",
                                 "valueOnRight": "1",
                                 "displayvalue": "Monthly Target"
                             }]
                         }]
                     };



                     ///////////
                     model.type = "column2d";
                     model.width = 600;
                     model.chartoptions = {
                         "containerBackgroundColor": "#FF0000",
                         "containerBackgroundOpacity": "0"
                     };
                     model.dataSource3 = {
                         "chart": {
                             "caption": "Monthly",
                             "xaxisname": "Month",
                             "yaxisname": "Revenue",
                             "numberprefix": "$",
                             "showvalues": "1",
                             "theme": "fint"
                         },
                         "data": [{
                                 "label": "Jan",
                                 "value": "420000"
                             },
                             {
                                 "label": "Feb",
                                 "value": "910000"
                             },
                             {
                                 "label": "Mar",
                                 "value": "720000"
                             },
                             {
                                 "label": "Apr",
                                 "value": "550000"
                             },
                             {
                                 "label": "May",
                                 "value": "810000"
                             },
                             {
                                 "label": "Jun",
                                 "value": "510000"
                             },
                             {
                                 "label": "Jul",
                                 "value": "680000"
                             },
                             {
                                 "label": "Aug",
                                 "value": "620000"
                             },
                             {
                                 "label": "Sep",
                                 "value": "610000"
                             },
                             {
                                 "label": "Oct",
                                 "value": "490000"
                             },
                             {
                                 "label": "Nov",
                                 "value": "530000"
                             },
                             {
                                 "label": "Dec",
                                 "value": "330000"
                             }
                         ],
                         "trendlines": [{
                             "line": [{
                                 "startvalue": "700000",
                                 "istrendzone": "1",
                                 "valueonright": "1",
                                 "tooltext": "AYAN",
                                 "endvalue": "900000",
                                 "color": "009933",
                                 "displayvalue": "Target",
                                 "showontop": "1",
                                 "thickness": "5"
                             }]
                         }],
                         "styles": {
                             "definition": [{
                                 "name": "CanvasAnim",
                                 "type": "animation",
                                 "param": "_xScale",
                                 "start": "0",
                                 "duration": "1"
                             }],
                             "application": [{
                                 "toobject": "Canvas",
                                 "styles": "CanvasAnim"
                             }]
                         }
                     };

                     model.changeOpacity = function() {
                         model.chartoptions.containerBackgroundOpacity = "" + (Math.round(Math.random() * 10) / 10);
                     };
                     model.changeWidth = function() {
                         model.width = 300;
                     };
                 };
                 vm.init();
             }
         ]);
 })();