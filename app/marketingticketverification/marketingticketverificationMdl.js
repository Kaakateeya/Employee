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
            model.dateOptions = {
                changeMonth: true,
                changeYear: true,
                yearRange: "-40:+5",
                dateFormat: 'dd/mm/yy',
                minDate: null,
                maxDate: null
            };
            model.ProfileIdTemplateDUrl = function(row) {
                var paidstatusclass = row.IsPaidMember === 372 ? 'paidclass' : 'unpaid';
                var paid = row.ProfileID !== undefined ? "<a href='javascript:void(0);' class='paidclass'>" + row.ProfileID + "</a><br>" : "";
                return paid;
            };
            model.ViewProfile = function(row) {
                window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
            };
            model.addingserialnumber = function(array) {
                var SNum = 1;
                _.map(array, function(item) {
                    item.Sno = SNum;
                    SNum++;
                });
                return array;
            };
            model.submitmarktingreports = function(type) {
                model.panelbodyhide = false;
                // model.columns = [
                //     { text: 'Sno', key: 'Sno', type: 'label' },
                //     { text: 'Profileid', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                //     { text: 'Marketing Ticket', key: 'TicketName', type: 'label' },
                //     { text: 'Marked By', key: 'TicketOwner', type: 'label' },
                //     { text: 'Agreed Amount', key: 'AgreedAmount', type: 'label' },
                //     { text: 'Paid Amount', key: 'TotalAmount', type: 'label' },
                //     { text: 'Commision Amount', key: 'CommisionAmt', type: 'label' }
                // ];
                model.columns = [
                    { text: 'Sno', key: 'Sno', type: 'label' },
                    { text: 'TicketOwner', key: 'TicketOwner', type: 'label' },
                    { text: 'Month', key: 'Month', type: 'label' },
                    { text: 'Agreed Amount', key: 'AgreedAmount', type: 'label' },
                    { text: 'Paid Amount', key: 'TotalAmount', type: 'label' },
                    { text: 'Commision Amount', key: 'TotalCommisionAmt', type: 'label' }
                ];
                var obj = {
                    intRegional: model.rbtnregional !== "" && model.rbtnregional !== null ? parseInt(model.rbtnregional) : null,
                    intBranch: model.tmarketingbranch !== "" && model.tmarketingbranch !== null && model.tmarketingbranch !== undefined ? (model.tmarketingbranch).toString() : null,
                    dtStartDate: model.dateemployeeverifyfrom !== "" && model.dateemployeeverifyfrom !== null && model.dateemployeeverifyfrom !== undefined ? (model.dateemployeeverifyfrom) : "",
                    dtEndDate: model.dateemployeeverifyto !== "" && model.dateemployeeverifyto !== null && model.dateemployeeverifyto !== undefined ? (model.dateemployeeverifyto) : "",
                    intEmpID: model.ticketmarketowner !== "" && model.ticketmarketowner !== null && model.ticketmarketowner !== undefined ? (model.ticketmarketowner).toString() : null,
                    intTicketVerified: model.mkttktverified !== "" && model.mkttktverified !== null && model.mkttktverified !== undefined ? parseInt(model.mkttktverified) : null,
                    intMarked: model.marktedvalue !== "" && model.marktedvalue !== null && model.marktedvalue !== undefined ? parseInt(model.marktedvalue) : null,
                };
                marketingticketverificationService.marketingverificationticketsubmit(obj).then(function(response) {
                    console.log(response);
                    if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" &&
                        response.data[0] !== undefined && response.data[0] !== null && response.data[0].length > 0) {
                        if (type === 'grid') {
                            model.TotalRows = response.data[0].length;
                            model.data = model.addingserialnumber(response.data[0]);
                        } else {
                            model.exportarray = [];
                            model.exportarray = response.data[0];
                            var options = {
                                headers: true,
                                columns: [{
                                        columnid: 'Sno',
                                        title: 'Sno'
                                    }, {
                                        columnid: 'TicketOwner',
                                        title: 'TicketOwner'
                                    }, {
                                        columnid: 'Month',
                                        title: 'Month'
                                    },
                                    {
                                        columnid: 'AgreedAmount',
                                        title: 'AgreedAmount'
                                    },
                                    {
                                        columnid: 'TotalAmount',
                                        title: 'TotalAmount'
                                    },
                                    {
                                        columnid: 'TotalCommisionAmt',
                                        title: 'TotalCommisionAmt'
                                    }
                                ]
                            };
                            alasql('SELECT TicketOwner as TicketOwner,Month as Month,AgreedAmount as AgreedAmount,TotalAmount as PaidAmount,TotalCommisionAmt  INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.exportarray]);
                        }
                    }
                });
            };
            model.resetmarketverification = function() {
                model.rbtnregional = null;
                model.tmarketingbranch = "";
                model.ticketmarketowner = "";
                model.mkttktverified = "";
                model.marktedvalue = "0";
            };
            model.pageloadbindings = function() {
                marketingticketverificationService.getMyprofilebind(1, 2, '').then(function(response) {
                    model.Brancharray = [];
                    model.Brancharray.push({ "label": "--select--", "title": "--select--", "value": "" });
                    _.each(response.data, function(item) {
                        switch (item.CountryCode) {
                            case "Branch":
                                model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                        }
                    });
                });
            };
            model.pagechange = function(val) {
                model.submitmarktingreports('grid');
            };
            model.exportexcel = function(topage) {
                model.submitmarktingreports('excel');
            };
            return model;

        }]);


})();