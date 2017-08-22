(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('ReportsofEmployeesModel', factory);

    factory.$inject = ['ReportsofEmployeesService', 'modelpopupopenmethod', 'Commondependency'];

    function factory(ReportsofEmployeesService, modelpopupopenmethod, Commondependency) {

        var model = {};
        model.arrayheader = ["Emp Name", "No of Profiles", "No Services", "No Login", "EMNV", "Paid", "Unpaid", "Graph"];

        ReportsofEmployeesService.getAdminReportsAllProfiles(2, "", "").then(function(response) {
            model.modelarraydynamic = [];
            console.log(response);
            _.each(response.data, function(item, index) {
                model.modelarraydynamic.push({ header: model.arrayheader, data: item, ida: false });
            });
        });
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
        };
        model.closeupload = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        model.colorsbackground = function(index) {
            if (index === 0) {
                model.colorsback = 'rgb(175, 209, 234)';
            } else {
                switch (model.colorsback) {
                    case 'rgb(175, 209, 234)':
                        model.colorsback = 'rgb(230, 165, 165)';
                        break;
                    case 'rgb(230, 165, 165)':
                        model.colorsback = 'rgb(166, 228, 211)';
                        break;
                    case 'rgb(166, 228, 211)':
                        model.colorsback = 'rgb(241, 178, 124)';
                        break;
                    case 'rgb(241, 178, 124)':
                        model.colorsback = 'rgb(175, 209, 234)';
                        break;
                }
            }
            return model.colorsback;
        };
        model.arrayslice = function(index) {
            model.modelarraydynamic.splice(index, 1);
            return false;
        };
        model.pageloadbindings = function() {
            ReportsofEmployeesService.getMyprofilebind(1, 2, '').then(function(response) {
                model.Brancharray = [];
                _.each(response.data, function(item) {
                    switch (item.CountryCode) {
                        case "Branch":
                            model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            break;
                    }
                });
            });
        };
        model.onchangebranch = function() {
            model.Brancharray = [];
            model.Brancharray = Commondependency.branch((model.rbtnregional !== undefined && model.rbtnregional !== null && model.rbtnregional !== "" && model.rbtnregional !== 0 && model.rbtnregional !== '0') ? (model.rbtnregional) : "");
        };
        return model;

    }
})();