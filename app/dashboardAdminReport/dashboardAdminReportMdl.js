(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('dashboardAdminReportModel', factory);
    factory.$inject = ['dashboardAdminReportService'];

    function factory(dashboardAdminReportService) {
        var model = {};
        model.reports = function() {
            dashboardAdminReportService.getAdminReportsAllProfiles(2, "", "").then(function(response) {
                model.dataSourcesmulti = [];
                model.dataset = [];
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
                    // model.charts.caption = model.empname;
                    model.dataSourcesmulti.push({
                        "chart": model.charts,
                        "categories": model.categiries,
                        "dataset": model.dataset,
                        "EmpName": model.empname
                    });
                });
            });
        };
        return model;
    }
})();