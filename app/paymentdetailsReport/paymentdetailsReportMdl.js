(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('paymentdetailsReportModel', ['paymentdetailsReportService',
            'complex-grid-config', 'arrayConstants', 'alert', 'modelpopupopenmethod', 'Commondependency', 'helperservice',
            function(paymentdetailsReportService, configgrid, arrayConstants, alerts,
                modelpopupopenmethod, Commondependency, helperservice) {
                var model = {};
                model.showsearchrows = true;
                model.showsearch = true;
                model.showpaging = true;
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
                model.modeofPaymentArr = [
                    { "label": "All", "title": "All", "value": 0 },
                    { "label": "Cash", "title": "Cash", "value": 345 },
                    { "label": "Credit card", "title": "Credit card", "value": 346 },
                    { "label": "cardCheque", "title": "cardCheque", "value": 347 },
                    { "label": "Bank online", "title": "Bank online", "value": 348 }
                ];
                model.ProfileIdTemplateDUrl = function(row) {
                    var paidstatusclass = row.IsPaidMember === 372 ? 'paidclass' : 'unpaid';
                    var paid = row.ProfileID !== undefined ? "<a href='javascript:void(0);' class='paidclass'>" + row.ProfileID + "</a><br>" : "";
                    return paid;
                };
                model.resetcontrols = function() {
                    model.rbtngender = "0";
                    model.txtprofileidpaymentreport = "";
                    model.rbtnpaymentstatus = "0";
                    model.Applicationstatus = null;
                    model.casteids = null;
                    model.rbtnregion = "0";
                    model.fromamount = "";
                    model.toamount = "";
                    model.txtpaymentfrom = "";
                    model.txtpaymentto = "";
                    model.rbtnModeOfPayment = 0;
                    _.each(model.Brancharray, function(item) {
                        model.branchids.push(item.value);
                    });
                    model.isDisabledsubmit = false;
                };
                model.pageloadbindings = function() {
                    model.Applicationstatus = [];
                    model.Applicationstatus = arrayConstants.Applicationstatus;
                    model.categoryarray = [];
                    model.categoryarray = arrayConstants.catgory;
                    helperservice.getMyprofilebind(1, 2, '').then(function(response) {
                        model.Brancharray = [];
                        model.Brancharraymain = [];
                        _.each(response.data, function(item) {
                            switch (item.CountryCode) {
                                case "Branch":
                                    model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                    model.Brancharraymain.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                    break;
                            }
                        });
                        model.branchids = [];
                        _.each(model.Brancharray, function(item) {
                            model.branchids.push(item.value);
                        });
                    });
                };
                model.ViewProfile = function(row) {
                    window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
                };
                model.sendmessages = function(row) {
                    var sa = "<a href='javascript:void(0);' ng-click='model.sendmessagesPOPUP(" + JSON.stringify(row.ProfileOwnerID) + "," + JSON.stringify(row.Cust_Id) + ");'>SendMessage</a>";
                    return sa;
                };
                model.sendemails = function(row) {
                    var sa = "<a href='javascript:void(0);' ng-click='model.sendmailscustomer(" + JSON.stringify(row.Cust_Id) + ");'>SendMail</a>";
                    return sa;
                };
                model.sendmessagesPOPUP = function(ProfileOwnerID, Cust_Id) {
                    //POPUP
                    model.toProfileOwnerID = ProfileOwnerID;
                    model.tocustid = Cust_Id;
                    model.categoryid = 0;
                    model.txtmeassagestext = "";
                    modelpopupopenmethod.showPopup('sendmessages.html', model.scope, 'md', '');

                };
                model.closepopup = function() {
                    modelpopupopenmethod.closepopup();
                };
                model.sentsmss = function(mobj) {
                    console.log(model.sendmsgobj);
                    var obj = {
                        CategoryID: model.categoryid !== "" && model.categoryid !== null && model.categoryid !== undefined && model.categoryid !== "0" && model.categoryid !== 0 ? model.categoryid : null,
                        MessageText: model.txtmeassagestext !== "" && model.txtmeassagestext !== undefined && model.txtmeassagestext !== null ? model.txtmeassagestext : null,
                        FromEmpID: model.empid,
                        ToEmpID: model.toProfileOwnerID,
                        CustID: model.tocustid
                    };
                    paymentdetailsReportService.sendsms(obj).then(function(response) {
                        console.log(response);
                        if (parseInt(response.data) === 1) {
                            model.closepopup();
                            alerts.timeoutoldalerts(model.scope, 'alert-success', "Message sent successfully", 4000);

                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', "Message Sending Failed", 4000);
                        }
                    });
                };
                model.sendmailscustomer = function(CustID) {
                    paymentdetailsReportService.sendmail(CustID).then(function(response) {
                        console.log(response);
                        if (parseInt(response.data) === 1) {
                            alerts.timeoutoldalerts(model.scope, 'alert-success', "Mail sent successfully", 4000);
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', "Mail Sending Failed", 4000);
                        }
                    });
                };

                model.columns = [
                    { text: 'Sno', key: 'SNO', type: 'label' },
                    { text: 'Profileid', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                    { text: 'Name', key: 'NAME', type: 'label' },
                    { text: 'Sur Name', key: 'SurName', type: 'label' },
                    { text: 'Gender', key: 'GENDERID', type: 'label' },
                    { text: 'caste', key: 'Caste', type: 'label' },
                    { text: 'DOR', key: 'DOR', type: 'label' },
                    { text: 'Payment type', key: 'PaymentType', type: 'label' },
                    { text: 'Payment mode', key: 'PaymentCashmode', type: 'label' },
                    { text: 'Paid entered by', key: 'paidenteredby', type: 'label' },
                    { text: 'Paid branch', key: 'paidbranch', type: 'label' },
                    { text: 'PaymentDate', key: 'paymnetdate', type: 'label' },
                    { text: 'Agreed amount', key: 'AgreedAmount', type: 'label' },
                    { text: 'Paid amount', key: 'PaidAmount', type: 'label' },
                    { text: 'Balance amount', key: 'BalanceAmount', type: 'label' },
                    //  { text: 'Marktd by', key: 'AssignMarktedname', type: 'label' },
                    // { text: 'Pay for', key: 'PayFor', type: 'label' },
                    // { text: 'Owner of the profile', key: 'ProfileOwner', type: 'label' },
                    // { text: 'Send message', key: 'marktby', type: 'morelinks', templateUrl: model.sendmessages },
                    //{ text: 'Send email', key: 'marktby', type: 'morelinks', templateUrl: model.sendemails }
                ];
                model.paymentreports = function(from, to, type) {
                    if (type === 'grid') {
                        model.objvalue = {
                            StrProfileID: model.txtprofileidpaymentreport !== null && model.txtprofileidpaymentreport !== undefined && model.txtprofileidpaymentreport !== "" ? model.txtprofileidpaymentreport : null,
                            IsAdmin: model.empid,
                            Gender: model.rbtngender !== null && model.rbtngender !== undefined && model.rbtngender !== "" && model.rbtngender !== "0" ? model.rbtngender : null,
                            PayFor: null,
                            PaymenytStatus: model.rbtnpaymentstatus !== null && model.rbtnpaymentstatus !== "" && model.rbtnpaymentstatus !== undefined && model.rbtnpaymentstatus !== "0" && model.rbtnpaymentstatus !== 0 ? model.rbtnpaymentstatus : null,
                            Region: model.rbtnregion !== null && model.rbtnregion !== "" && model.rbtnregion !== undefined && model.rbtnregion !== "0" ? model.rbtnregion : null,
                            Confidential: model.isconfidential === true ? 1 : 0,
                            IsServiceTaxPaid: null,
                            IsAmountThere: model.isbalamount === true ? 1 : 0,
                            EmpType: null,
                            profileownerid: null,
                            ApplicationStatusid: model.ApplicationStatusid !== "" && model.ApplicationStatusid !== null && model.ApplicationStatusid !== undefined ? model.ApplicationStatusid.toString() : null,
                            FromAmount: model.fromamount !== "" && model.fromamount !== null && model.fromamount !== undefined ? model.fromamount : null,
                            ToAmount: model.toamount !== "" && model.toamount !== null && model.toamount !== undefined ? model.toamount : null,
                            Casteid: model.casteids !== "" && model.casteids !== null && model.casteids !== undefined ? model.casteids.toString() : null,
                            Branchid: model.branchids !== "" && model.branchids !== null && model.branchids !== undefined ? model.branchids.toString() : null,
                            StartDate: model.txtpaymentfrom !== "" && model.txtpaymentfrom !== null && model.txtpaymentfrom !== undefined ? moment(model.txtpaymentfrom).format('YYYY-MM-DD HH:MM:SS') : null,
                            EndDate: model.txtpaymentto !== "" && model.txtpaymentto !== null && model.txtpaymentto !== undefined ? moment(model.txtpaymentto).format('YYYY-MM-DD HH:MM:SS') : null,
                            From: from,
                            To: to,
                            flag: 0,
                            ModeOfPaymentID: model.rbtnModeOfPayment !== null && model.rbtnModeOfPayment !== "" && model.rbtnModeOfPayment !== undefined && model.rbtnModeOfPayment !== "0" && model.rbtnModeOfPayment !== 0 ? model.rbtnModeOfPayment : null
                        };
                    } else {
                        model.isDisabledsubmit = false;
                        model.objvalue.From = from;
                        model.objvalue.To = to;
                    }
                    paymentdetailsReportService.EmplyeepaymentReportspayment(model.objvalue).then(function(response) {
                        model.isDisabledsubmit = false;
                        if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" &&
                            response.data[0] !== undefined && response.data[0] !== null && response.data[0].length > 0) {
                            model.panelbodyhide = false;
                            if (type === 'grid') {
                                model.data = [];
                                model.TotalRows = response.data[0][0].TotalRows;
                                model.data = response.data[0];
                            } else {
                                model.exportarray = [];
                                model.exportarray = response.data[0];
                                var options = {
                                    headers: true,
                                    columns: [{
                                            columnid: 'SNO',
                                            title: 'Sno'
                                        }, {
                                            columnid: 'ProfileID',
                                            title: 'ProfileID'
                                        }, {
                                            columnid: 'NAME',
                                            title: 'NAME'
                                        },
                                        {
                                            columnid: 'SurName',
                                            title: 'SurName'
                                        },
                                        {
                                            columnid: 'paymnetdate',
                                            title: 'paymnetdate'
                                        },
                                        {
                                            columnid: 'PaymentCashmode',
                                            title: 'Paymentmode'
                                        },
                                        {
                                            columnid: 'AgreedAmount',
                                            title: 'AgreedAmount'
                                        },
                                        {
                                            columnid: 'PaidAmount',
                                            title: 'PaidAmount'
                                        },
                                        {
                                            columnid: 'BalanceAmount',
                                            title: 'BalanceAmount'
                                        },
                                        {
                                            columnid: 'paidbranch',
                                            title: 'Paidbranch'
                                        },
                                        {
                                            columnid: 'ProfileOwner',
                                            title: 'ProfileOwner'
                                        },
                                        {
                                            columnid: 'GENDERID',
                                            title: 'GENDERID'
                                        },
                                        {
                                            columnid: 'Caste',
                                            title: 'Caste'
                                        },
                                        {
                                            columnid: 'PaymentType',
                                            title: 'PaymentType'
                                        },


                                        {
                                            columnid: 'DOR',
                                            title: 'DOR'
                                        },

                                        {
                                            columnid: 'marktby',
                                            title: 'marktby'
                                        },
                                        {
                                            columnid: 'Marktedname',
                                            title: 'AssignMarktedID'

                                        },
                                        {
                                            columnid: 'paidenteredby',
                                            title: 'paidenteredby'
                                        },

                                    ]
                                };
                                alasql('SELECT SNO,ProfileID,NAME,SurName,paymnetdate,PaymentCashmode,AgreedAmount,PaidAmount,BalanceAmount,paidbranch,GENDERID,Caste,PaymentType,DOR,paidenteredby INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.exportarray]);
                            }
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 4000);
                        }
                    });
                };

                model.pagechange = function(val) {
                    var to = val * 100;
                    var from = val === 1 ? 1 : to - 99;
                    model.paymentreports(from, to, 'grid');
                };
                model.exportexcel = function(topage) {
                    model.paymentreports(1, topage, 'excel');
                };

                model.onchangebranch = function() {
                    model.Brancharray = [];
                    model.Brancharray = Commondependency.branch((model.rbtnregion !== undefined && model.rbtnregion !== null && model.rbtnregion !== "" && model.rbtnregion !== 0 && model.rbtnregion !== '0') ? (model.rbtnregion) : "");
                };
                return model;
            }
        ]);
})();