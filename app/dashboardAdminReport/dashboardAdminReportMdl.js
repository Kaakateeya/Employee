(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('dashboardAdminReportModel', factory);

    factory.$inject = ['dashboardAdminReportService'];

    function factory(dashboardAdminReportService) {

        var model = {};
        // model.myDataSource = {
        //     chart: {
        //         caption: "Harry's SuperMart",
        //         subCaption: "Top 5 stores in last month by revenue",
        //         numberPrefix: "$",
        //         theme: "fint"
        //     },
        //     data: [{
        //         label: "Bakersfield Central",
        //         value: "880000"
        //     }, {
        //         label: "Garden Groove harbour",
        //         value: "730000"
        //     }, {
        //         label: "Los Angeles Topanga",
        //         value: "590000"
        //     }, {
        //         label: "Compton-Rancho Dom",
        //         value: "520000"
        //     }, {
        //         label: "Daly City Serramonte",
        //         value: "330000"
        //     }]
        // };
        // model.myDataSource = {

        //     "chart": {
        //         "caption": "Product Wise Sales",
        //         "bgcolor": "FFFFFF",
        //         "canvasborderalpha": "0",
        //         "palettecolors": "f8bd19",
        //         "plotgradientcolor": "",
        //         "showalternatehgridcolor": "0",
        //         "divlinecolor": "CCCCCC",
        //         "showplotborder": "0",
        //         "showcanvasborder": "0",
        //         "showborder": "0",
        //         "formatnumberscale": "0",
        //         "numberprefix": "$",
        //         "animation": "1",
        //         "showvalues": 1,
        //         "rotatevalues": 1,
        //         "placevaluesinside": "1"
        //     },
        //     "categories": [{
        //         "category": [{
        //                 "name": "Quarter 1",
        //                 "label": "",
        //                 "style": {}
        //             },
        //             {
        //                 "name": "Quarter 2",
        //                 "label": "",
        //                 "style": {}
        //             },
        //             {
        //                 "name": "Quarter 3",
        //                 "label": "",
        //                 "style": {}
        //             },
        //             {
        //                 "name": "Quarter 4",
        //                 "label": "",
        //                 "style": {}
        //             }
        //         ]
        //     }],
        //     "dataset": [{
        //             "seriesname": "Product A",
        //             "color": "008ee4",
        //             "data": [{
        //                     "value": "659400"
        //                 },
        //                 {
        //                     "value": "465400"
        //                 },
        //                 {
        //                     "value": "764500"
        //                 },
        //                 {
        //                     "value": "650500"
        //                 }
        //             ]
        //         },
        //         {
        //             "seriesname": "Product B",
        //             "color": "f8bd19",
        //             "data": [{
        //                     "value": "546300"
        //                 },
        //                 {
        //                     "value": "436500"
        //                 },
        //                 {
        //                     "value": "546500"
        //                 },
        //                 {
        //                     "value": "332500"
        //                 }
        //             ]
        //         },
        //         {
        //             "seriesname": "Product C",
        //             "color": "6baa01",
        //             "data": [{
        //                     "value": "657600"
        //                 },
        //                 {
        //                     "value": "564600"
        //                 },
        //                 {
        //                     "value": "348600"
        //                 },
        //                 {
        //                     "value": "436600"
        //                 }
        //             ]
        //         },
        //         {
        //             "seriesname": "Product D",
        //             "color": "e44a00",
        //             "data": [{
        //                     "value": "436500"
        //                 },
        //                 {
        //                     "value": "765700"
        //                 },
        //                 {
        //                     "value": "453900"
        //                 },
        //                 {
        //                     "value": "326400"
        //                 }
        //             ]
        //         }
        //     ]

        // };
        // model.dataSource5 = {

        //     "chart": {
        //         "caption": "Sales figures for top 4 chocolate brands - FY2013-2014",
        //         "subCaption": "Harry's SuperMart",
        //         "xAxisName": "Brand",
        //         "yAxisName": "Amount (In USD)",
        //         "yAxisMaxValue": "120000",
        //         "numberPrefix": "$",
        //         "theme": "fint",
        //         "chartBottomMargin": "70",
        //         "PlotfillAlpha": "0",
        //         "placeValuesInside": "0",
        //         "rotateValues": "0",
        //         "valueFontColor": "#333333"
        //     },
        //     "annotations": {
        //         "width": "500",
        //         "height": "300",
        //         "autoScale": "1",
        //         "groups": [{
        //             "id": "user-images",
        //             "items": [{
        //                 "id": "butterFinger-icon",
        //                 "type": "image",
        //                 "url": "http://static.fusioncharts.com/sampledata/images/butterFinger.png",
        //                 "x": "$xaxis.label.0.x - 30",
        //                 "y": "$canvasEndY - 169",
        //                 "xScale": "50",
        //                 "yScale": "45",
        //             }, {
        //                 "id": "tom-user-icon",
        //                 "type": "image",
        //                 "url": "http://static.fusioncharts.com/sampledata/images/snickrs.png",
        //                 "x": "$xaxis.label.1.x - 26",
        //                 "y": "$canvasEndY - 160",
        //                 "xScale": "48",
        //                 "yScale": "43"
        //             }, {
        //                 "id": "Milton-user-icon",
        //                 "type": "image",
        //                 "url": "http://static.fusioncharts.com/sampledata/images/coffee_crisp.png",
        //                 "x": "$xaxis.label.2.x - 22",
        //                 "y": "$canvasEndY - 154",
        //                 "xScale": "43",
        //                 "yScale": "41"
        //             }, {
        //                 "id": "Brian-user-icon",
        //                 "type": "image",
        //                 "url": "http://static.fusioncharts.com/sampledata/images/100grand.png",
        //                 "x": "$xaxis.label.3.x - 22",
        //                 "y": "$canvasEndY - 150",
        //                 "xScale": "43",
        //                 "yScale": "40"
        //             }, {
        //                 "id": "dyn-label-bg",
        //                 "type": "rectangle",
        //                 "showBorder": "1",
        //                 "borderColor": "12345d",

        //                 "fillcolor": "ffffff",
        //                 "x": "$canvasEndY-245",
        //                 "y": "$canvasEndY+45",
        //                 "tox": "$canvasEndX+10",
        //                 "toy": "$canvasEndY + 80"

        //             }, {
        //                 "id": "dyn-label",
        //                 "type": "text",
        //                 "fillcolor": "#000000",
        //                 "fontsize": "11",
        //                 "text": "Promotional activities for Butterfinger made it surpass Snickers, the highest selling brand for 3 years",
        //                 "bold": "1",
        //                 "wrap": "1",
        //                 "wrapWidth": "350",
        //                 "x": "$canvasEndY-72",
        //                 "y": "$canvasEndY + 60",
        //             }]
        //         }]
        //     },
        //     "data": [{
        //         "label": "Butterfinger",
        //         "value": "92000"
        //     }, {
        //         "label": "Snickers",
        //         "value": "87000"
        //     }, {
        //         "label": "Coffee Crisp",
        //         "value": "83000"
        //     }, {
        //         "label": "100 Grand",
        //         "value": "80000"
        //     }]
        // };
        model.reports = function() {
            dashboardAdminReportService.getAdminReportsAllProfiles(2, "", "").then(function(response) {
                console.log(response);
                model.dataSourcesmulti = [];
                model.dataset = [];
                _.each(response.data, function(item) {
                    console.log(item);
                    model.dataset = [];
                    _.each(item, function(inneritem) {
                        model.dataset.push({
                            "seriesname": inneritem.Tablename,
                            "data": [{
                                "value": inneritem.activeCount
                            }, {
                                "value": inneritem.InactiveCount
                            }, {
                                "value": inneritem.PaidCount
                            }, {
                                "value": inneritem.UnPaidCount
                            }, {
                                "value": inneritem.NoPhotoCount
                            }, {
                                "value": inneritem.NoHoroCount
                            }]
                        });
                        model.empname = inneritem.EmpName;
                    });
                    // model.charts.caption = model.empname;
                    model.dataSourcesmulti.push({
                        "chart": model.charts,
                        "categories": model.categiries,
                        "dataset": model.dataset,
                        "EmpName": model.empname
                    });
                });

                console.log(model.dataSourcesmulti);
            });
        };
        return model;

    }
})();