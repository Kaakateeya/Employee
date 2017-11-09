(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('marketingticketverificationModel', ['marketingticketverificationService', 'complex-grid-config', 'Commondependency',
            'helperservice', 'SelectBindServiceApp', 'modelpopupopenmethod', 'alert', '$filter',
            function(marketingticketverificationService, configgrid, Commondependency, helpService, SelectBindServiceApp,
                commonpage, alertss, filter) {
                var model = {};
                model.innergrid = {};
                model.showsearchrows = true;
                model.showsearch = true;
                model.showpaging = false;
                model.showClientpaging = false;
                model.myprofileexcel = true;
                model.normalexcel = true;
                model.gridTableshow = false;
                model.showplus = false;
                model.innergrid.showsearchrows = true;
                model.innergrid.showsearch = true;
                model.innergrid.showpaging = true;
                model.innergrid.showClientpaging = false;
                model.innergrid.myprofileexcel = true;
                model.innergrid.normalexcel = true;
                model.innergrid.gridTableshow = false;
                model.innergrid.showplus = false;
                model.onlyempnames = [];
                model.onlyBranchArr = [];
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

                model.innergrid.marketingpopup = function(ticketid) {
                    model.marketingTicketid = ticketid;
                    commonpage.showPopupphotopoup('marketverifytkt.html', model.scope, 'md', "modalclassdashboardphotopopup");
                };
                model.historyshowing = function(row) {
                    var paid = "<a class='' href='javascript:void(0);' ng-click='model.profileshistory(" + JSON.stringify(row.CustIDsList) + "," + row.TicketOwnerID + ");'> History </a>";
                    return paid;
                };
                model.ticketid = function(row) {
                    var paid = "<a class='' href='javascript:void(0);' ng-click='model.marketingpopup(" + (row.ticketid) + ");'>" + row.TicketName + "</a>";
                    return paid;
                };
                model.paidamount = function(row) {
                    var str = row.optionType === 'label' ? '<label>' + row.PaidAmount + '</label>' : '<input  type="text" ng-model="row.PaidAmount" class="form-control">';
                    return str;
                };
                model.commisionamt = function(row) {
                    var str = row.optionType === 'label' ? '<label>' + row.comminsion + '</label>' : '<input  type="text" ng-model="row.comminsion" class="form-control">';
                    return str;
                };
                model.TicketMrkedStatus = function(row) {
                    var ticket = row.TicketMrkedStatus === false ? 0 : 1;
                    var str = row.optionType === 'label' ? '<label>' + ticket + '</label>' : '<input  type="text" ng-model="row.mrktedstatus" class="form-control">';
                    return str;
                };

                model.optionTemplate = function(row) {
                    var lblname = row.optionType === 'label' ? 'Edit' : 'Save';
                    var str = '<a>' + lblname + '</a>';
                    return str;
                };
                model.actionlink = function(row) {
                    if (row.optionType === 'input') {
                        var paidamount = model.innergrid['paidamount' + row.sno] !== "" && model.innergrid['paidamount' + row.sno] !== null && model.innergrid['paidamount' + row.sno] !== undefined ? model.innergrid['paidamount' + row.sno] : "";
                        var commisionamt = model.innergrid['commisionamt' + row.sno] !== "" && model.innergrid['commisionamt' + row.sno] !== null && model.innergrid['commisionamt' + row.sno] !== undefined ? model.innergrid['commisionamt' + row.sno] : "";
                        var mrktedstatus = model.innergrid['mrktedstatus' + row.sno] !== "" && model.innergrid['mrktedstatus' + row.sno] !== null && model.innergrid['mrktedstatus' + row.sno] !== undefined ? model.innergrid['mrktedstatus' + row.sno] : "";
                        var obj = {
                            Empid: row.EmpID,
                            Profileid: row.profileid,
                            Emp_commisionTicketid: row.Emp_Commision_TicketID,
                            PaidAmount: paidamount,
                            commisionAmount: commisionamt,
                            TicketMrkedStatus: mrktedstatus === 0 ? false : true
                        };

                        marketingticketverificationService.updatemarketingvrfycation(obj).then(function(response) {
                            if (response.data && parseInt(response.data) === 1) {
                                row.optionType = 'label';
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Updated Succesfully', 4500);
                            } else {
                                row.optionType = 'label';
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Updated failed', 4500);
                            }
                        });
                    } else {
                        row.optionType = 'input';
                    }
                };
                model.innergrid.ViewProfile = function(ProfileID) {
                    window.open('/Viewfullprofile/' + ProfileID + '/0', '_blank');
                };

                model.returnProfileIDTemplate = function(row) {
                    var paidstatusclass = 'paidclass';
                    var paid = "<a class='" + paidstatusclass + "' href='javascript:void(0);' ng-click='model.ViewProfile(" + JSON.stringify(row.profileid) + ");'>" + row.profileid + "</a>";
                    return paid;
                };

                model.profileshistory = function(value, innerempid) {
                    model.innergrid.columns = [
                        { text: 'Profile ID', key: 'profileid', type: 'morelinks', templateUrl: model.returnProfileIDTemplate },
                        { text: 'TicketID', key: 'TicketName', type: 'morelinks', templateUrl: model.ticketid },
                        { text: 'Paid Amount', key: 'PaidAmounts', type: 'textbox', templateUrl: model.paidamount, model: 'paidamount' },
                        { text: 'Commision Amount', key: 'commisionamts', type: 'textbox', templateUrl: model.commisionamt, model: 'commisionamt' },
                        { text: 'Walk In', key: 'TicketMrkedStatus', type: 'textbox', templateUrl: model.TicketMrkedStatus, model: 'mrktedstatus' },
                        { text: '', key: 'customlink', type: 'customlink', templateUrl: model.optionTemplate, method: model.actionlink }
                    ];
                    marketingticketverificationService.marketinggetprofiledetails(value, innerempid).then(function(response) {
                        model.innergrid.sdata = response.data[0];
                        _.map(model.innergrid.sdata, function(item, index) {
                            item.sno = index + 1;
                            item.optionType = 'label';
                            model.innergrid['paidamount' + item.sno] = item.PaidAmount;
                            model.innergrid['commisionamt' + item.sno] = item.commisionamt;
                            model.innergrid['mrktedstatus' + item.sno] = item.TicketMrkedStatus === false ? 0 : 1;
                        });
                        commonpage.showPopup('innergrid.html', model.scope, 'md', "modalclassdashboard");

                    });
                };

                model.submitmarktingreports = function(type) {
                    model.isDisabledsubmit = true;
                    model.panelbodyhide = false;
                    model.data = [];
                    model.pageSize = 10;
                    model.columns = [
                        { text: 'Sno', key: 'Sno', type: 'label' },
                        { text: 'History', key: 'Sno', type: 'morelinks', templateUrl: model.historyshowing },
                        { text: 'Profiles count', key: 'ProfileCount', type: 'label' },
                        { text: 'TicketOwner', key: 'TicketOwner', type: 'label' },
                        { text: 'Month', key: 'Month', type: 'label' },
                        { text: 'Agreed Amount', key: 'AgreedAmount', type: 'label' },
                        { text: 'Paid Amount', key: 'TotalAmount', type: 'label' },
                        { text: 'Commision Amount', key: 'TotalCommisionAmt', type: 'label' }
                    ];
                    debugger;
                    var obj = {
                        intRegional: model.rbtnregional !== "" && model.rbtnregional !== null ? parseInt(model.rbtnregional) : null,
                        intBranch: model.tmarketingbranch !== "" && model.tmarketingbranch !== null && model.tmarketingbranch !== undefined ? (model.tmarketingbranch).toString() : null,
                        dtStartDate: model.dateemployeeverifyfrom !== "" && model.dateemployeeverifyfrom !== null && model.dateemployeeverifyfrom !== undefined ? filter('date')(model.dateemployeeverifyfrom, 'yyyy-MM-dd') : "",
                        dtEndDate: model.dateemployeeverifyto !== "" && model.dateemployeeverifyto !== null && model.dateemployeeverifyto !== undefined ? filter('date')(model.dateemployeeverifyto, 'yyyy-MM-dd') : "",
                        intEmpID: null,
                        intTicketVerified: model.mkttktverified !== "" && model.mkttktverified !== null && model.mkttktverified !== undefined ? parseInt(model.mkttktverified) : null,
                        intMarked: model.marktedvalue !== "" && model.marktedvalue !== null && model.marktedvalue !== undefined ? parseInt(model.marktedvalue) : null,
                    };
                    console.log(obj);
                    marketingticketverificationService.marketingverificationticketsubmit(obj).then(function(response) {
                        model.isDisabledsubmit = false;
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
                    model.rdntypeofreport = "";
                    model.dateemployeeverifyfrom = "";
                    model.dateemployeeverifyto = "";
                };
                model.pageloadbindings = function() {
                    model.getemployee('Branch', '');
                };
                model.pagechange = function(val) {
                    model.submitmarktingreports('grid');
                };
                model.exportexcel = function(topage) {
                    model.submitmarktingreports('excel');
                };

                model.onchangebranch = function(parent) {
                    model.onlyBranchArr = [];
                    model.onlyBranchArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    model.onlyBranchArr = Commondependency.branchselect(parent);
                };
                model.typeOFreportChange = function(val) {
                    if (val === '0') {
                        model.getemployee('EmapName', '');
                    } else {
                        model.getemployee('Branch', '');
                    }
                };

                model.getemployee = function(flag, id) {
                    if (flag === 'EmapName') {
                        model.ticketmarketowner = '';
                        if (model.onlyempnames.length === 0) {
                            SelectBindServiceApp.onlyEmpNames(flag, id).then(function(response) {
                                if (_.isArray(response.data) && response.data.length > 0) {
                                    model.onlyempnames.push({ "label": "--select--", "title": "--select--", "value": "" });
                                    _.each(response.data, function(item) {
                                        model.onlyempnames.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                    });
                                }
                            });
                        }
                    } else {
                        model.tmarketingbranch = '';
                        if (model.onlyBranchArr.length === 0) {
                            SelectBindServiceApp.onlyEmpNames(flag, id).then(function(response) {
                                if (_.isArray(response.data) && response.data.length > 0) {
                                    model.onlyBranchArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                                    _.each(response.data, function(item) {
                                        model.onlyBranchArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                    });
                                }
                            });
                        }
                    }

                };
                model.closeinnergrid = function() {
                    commonpage.closepopup();
                };
                return model;

            }
        ]);


})();