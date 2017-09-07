(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('ReportsofEmployeesModel', factory);

    factory.$inject = ['ReportsofEmployeesService', 'modelpopupopenmethod', 'Commondependency', '$timeout'];

    function factory(ReportsofEmployeesService, modelpopupopenmethod, Commondependency, timeout) {
        var model = {};
        model.arrayheader = ["Emp Name", "Total profiles", "No Services", "No Login", "EMNV", "Paid", "Unpaid", "Payment expired Customers", "No Photos", "In active Customers", "Email Bounce Info", "Presently In india", "Graph"];
        model.scrollevent = function(tableId) {
            var hscroll = '#table_' + tableId + ' .pane-hScroll';
            var vScroll = '#table_' + tableId + ' .pane-vScroll';
            $(hscroll).scroll(function() {
                $(vScroll).width($(hscroll).width() + $(hscroll).scrollLeft());
            });
        };
        model.initdata = function(empid, branchid, region, macaddress, flag, v_ProfileOwnerEmpID) {
            ReportsofEmployeesService.getAdminReportsAllProfiles(empid, branchid, region, macaddress, flag, v_ProfileOwnerEmpID).then(function(response) {
                model.modelarraydynamic = [];
                console.log(response);
                _.each(response.data, function(item, index) {
                    model.modelarraydynamic.push({ header: model.arrayheader, data: item, ida: false });
                });
            });
        };
        model.submitreports = function() {
            model.initdata("", model.tmarketingbranch !== undefined && model.tmarketingbranch !== null && model.tmarketingbranch !== "" && model.tmarketingbranch.length > 0 ? model.tmarketingbranch.toString() : "", model.rbtnregional !== undefined && model.rbtnregional !== null ? model.rbtnregional : '', "", 1, model.tmarketingempname !== undefined && model.tmarketingempname !== null && model.tmarketingempname !== "" && model.tmarketingempname.length > 0 ? model.tmarketingempname.toString() : "");
        };

        model.popupopen = function(Empid) {
            model.singleempid = Empid;
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
            model.dataSourcesmulti = [];
            model.dataset = [];
            ReportsofEmployeesService.getAdminReportsAllProfiles(model.singleempid, "", "", "", 2, "").then(function(response) {
                _.each(response.data, function(item) {
                    model.dataset = [];
                    _.each(item, function(inneritem) {
                        model.dataset.push({
                            "seriesname": inneritem.Tablename + " days",
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
                    model.dataSourcesmulti.push({
                        "chart": model.charts,
                        "categories": model.categiries,
                        "dataset": model.dataset,
                        "EmpName": model.empname
                    });
                });
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
                model.ProfileOwnerarray = [];
                _.each(response.data, function(item) {
                    switch (item.CountryCode) {
                        case "Branch":
                            model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            break;
                        case "Profile Owner":
                            model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID, "display": item.Name });
                            break;
                    }
                });
            });
        };
        model.onchangebranch = function() {
            model.Brancharray = [];
            model.Brancharray = Commondependency.branch((model.rbtnregional !== undefined && model.rbtnregional !== null && model.rbtnregional !== "" && model.rbtnregional !== 0 && model.rbtnregional !== '0') ? (model.rbtnregional) : "");
        };
        model.resetreports = function() {
            model.rbtnregional = "";
            timeout(function() {
                model.tmarketingbranch = "";
                model.tmarketingempname = "";
            }, 50);
            model.pageloadbindings();
        };
        return model;

    }
})();