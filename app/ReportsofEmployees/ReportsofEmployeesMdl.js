(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('ReportsofEmployeesModel', factory);

    factory.$inject = ['ReportsofEmployeesService', 'modelpopupopenmethod'];

    function factory(ReportsofEmployeesService, modelpopupopenmethod) {

        var model = {};
        model.arrayheader = ["Emp Name", "No of Profiles", "No Services", "No Login", "EMNV", "Paid", "Unpaid", "Graph"];
        model.modelarray = [{
            facility: "Admin",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 20,
            Plansss: 100,
            class: 'rgb(175, 209, 234)',
            Graph: '<i class="fa fa-bar-chart" aria-hidden="true"></i>'

        }, {
            facility: "Jyothi",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 20,
            Plansss: 100,
            class: 'rgb(230, 165, 165)',
            Graph: '<i class="fa fa-bar-chart" aria-hidden="true"></i>'
        }, {
            facility: "Kalpana",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 20,
            Plansss: 100,
            class: 'rgb(166, 228, 211)',
            Graph: '<i class="fa fa-bar-chart" aria-hidden="true"></i>'
        }, {
            facility: "Santhi",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 100,
            Plansss: 150,
            class: 'rgb(241, 178, 124)',
            Graph: '<i class="fa fa-bar-chart" aria-hidden="true"></i>'
        }, ];
        model.modelarray2 = [{
            facility: "Neeraja",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 100,
            Plansss: 150,
            class: 'rgb(175, 209, 234)',
            Graph: '<i class="fa fa-bar-chart" aria-hidden="true"></i>'

        }, {
            facility: "Jyothi",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 20,
            Plansss: 100,
            class: 'rgb(230, 165, 165)',
            Graph: '<i class="fa fa-bar-chart" aria-hidden="true"></i>'
        }, {
            facility: "Kalpana",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 20,
            Plansss: 100,
            class: 'rgb(166, 228, 211)',
            Graph: '<i class="fa fa-bar-chart" aria-hidden="true"></i>'
        }, {
            facility: "Santhi",
            code: "230",
            cost: 100,
            conditionRating: 52,
            extent: 50,
            planYear: 20,
            Plansss: 100,
            class: 'rgb(241, 178, 124)',
            Graph: '<i class="fa fa-bar-chart" aria-hidden="true"></i>'
        }, ];

        model.popupopen = function() {
            model.reportsgraph();
            modelpopupopenmethod.showPopupphotopoup('graph.html', model.scope, 'lg', "modalclassofeditss");
        };

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
        model.reportsgraph = function() {
            ReportsofEmployeesService.getAdminReportsAllProfiles(2, "", "").then(function(response) {
                console.log(response);
                model.dataSourcesmulti = [];
                model.dataset = [];
                _.each(response.data, function(item) {
                    console.log(item);
                    model.dataset = [];
                    _.each(item, function(inneritem) {
                        model.dataset.push({
                            "seriesname": inneritem.Tablename,
                            // "initiallyHidden": inneritem.Tablename === '7days' ? '1' : '0',
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
                    model.dataSourcesmulti = [{
                        "chart": model.charts,
                        "categories": model.categiries,
                        "dataset": [{
                            "seriesname": "7 days",
                            "data": [{
                                "value": "130"
                            }, {
                                "value": "200"
                            }, {
                                "value": "100"
                            }, {
                                "value": "150"
                            }, {
                                "value": "155"
                            }, {
                                "value": "170"
                            }, {
                                "value": "195"
                            }, {
                                "value": "186"
                            }, {
                                "value": "189"
                            }],

                        }, {
                            "seriesname": "15 Days",
                            "data": [{
                                "value": "154"
                            }, {
                                "value": "168"
                            }, {
                                "value": "188"
                            }, {
                                "value": "224"
                            }, {
                                "value": "238"
                            }, {
                                "value": "258"
                            }, {
                                "value": "308"
                            }, {
                                "value": "195"
                            }, {
                                "value": "195"
                            }]
                        }, {
                            "seriesname": "30 Days",
                            "data": [{
                                "value": "154"
                            }, {
                                "value": "168"
                            }, {
                                "value": "188"
                            }, {
                                "value": "224"
                            }, {
                                "value": "238"
                            }, {
                                "value": "258"
                            }, {
                                "value": "308"
                            }, {
                                "value": "195"
                            }, {
                                "value": "195"
                            }]
                        }],

                        "EmpName": model.empname
                    }];
                });

            });
        };
        model.closeupload = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        return model;

    }
})();