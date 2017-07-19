(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('marketingticketverificationModel', ['marketingticketverificationService', 'complex-grid-config', function(marketingticketverificationService, configgrid) {
            var model = {};
            model.showsearchrows = true;
            model.showsearch = true;
            model.showpaging = true;
            model.showClientpaging = false;
            model.myprofileexcel = true;
            model.normalexcel = true;
            model.gridTableshow = false;
            model.showplus = false;
            model.submitmarktingreports = function() {
                model.columns = [
                    { text: 'Sno', key: 'Sno', type: 'label' },
                    { text: 'Profileid', key: 'Profileid', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                    { text: 'Marketing Ticket', key: 'ticketid', type: 'label' },
                    { text: 'Marked By', key: 'marktingempid', type: 'label' },
                    { text: 'Agreed Amount', key: 'aggreedamount', type: 'label' },
                    { text: 'Agreed Amount', key: 'aggreedamount', type: 'label' },
                ];
                var obj = {
                    empid: model.empid,
                    Region: model.rbtnregional,
                    branch: model.tmarketingbranch,
                    Employeeids: model.ticketmarketowner,
                    marketverified: model.mkttktverified,
                    marketvalueemp: model.marktedvalue
                };
                marketingticketverificationService.marketingverificationticketsubmit(obj).then(function(response) {
                    console.log(response);
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" &&
                        response.data[0] !== undefined && response.data[0] !== null && response.data[0].length > 0) {
                        model.TotalRows = response.data[0][0].TotalRows;
                        model.data = (response.data[0]);
                    }
                });
            };
            model.resetmarketverification = function() {
                model.rbtnregional = null;
                model.tmarketingbranch = "";
                model.ticketmarketowner = "";
                model.mkttktverified = "";
                model.marktedvalue = "";
            };
            return model;

        }]);


})();