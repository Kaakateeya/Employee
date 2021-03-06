(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('paymentAuthorizationModel', ['paymentAuthorizationService',
            'Commondependency', 'complex-grid-config', 'modelpopupopenmethod',
            'authSvc', 'alert', 'SelectBindServiceApp', '$timeout',
            function(paymentAuthorizationService,
                Commondependency, config, modelpopupopenmethod, authSvc, alertss, service, timeout) {
                var model = {};
                var empid;
                model.scope = {};
                model.showsearchrows = true;
                model.showsearch = false;
                model.showpaging = false;
                model.showClientpaging = false;
                model.myprofileexcel = false;
                model.normalexcel = false;
                model.employeenamearray = [];
                var AdminID, Managementid;
                model.dateOptions = {
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-40:+5",
                    dateFormat: 'dd-mm-yy'
                };
                model.showplus = false;
                model.init = function() {
                    empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                    AdminID = authSvc.isAdmin();
                    Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
                    model.rdnRegion = '0';
                    model.startDate = model.endDate = '';
                    model.type = '';
                    model.paymentAuthSelect();
                    return model;
                };

                model.ProfileIdTemplateDUrl = function(row) {
                    var paidstatusclass = row.PaidStatus === 1 ? 'paidclass' : 'unpaid';
                    var paid = row.ProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>" : "";
                    return paid;
                };
                model.ViewProfile = function(row) {
                    window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
                };
                model.Ticketpopupupdate = function(row) {
                    var links = row.TicketName !== null ? "<a href='javascript:void(0);' ng-click='model.ticketpopupupdateshow(" + JSON.stringify(row) + ");'>" + row.TicketName + "</a>" : "--";
                    return links;
                };
                model.ticketpopupupdateshow = function(row) {
                    model.marketingTicketid = row.Emp_Ticket_ID;
                    modelpopupopenmethod.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");
                };

                model.paymentAuthSelect = function(type) {
                    var inObj = {
                        BranchID: model.branch ? model.branch : '',
                        StartDate: model.startDate ? moment(model.startDate).format('MM/DD/YYYY') : '',
                        EndDate: model.endDate ? moment(model.endDate).format('MM/DD/YYYY') : '',
                        Region: model.rdnRegion ? model.rdnRegion : ''
                    };

                    model.columns = [{ text: 'Profile ID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                        // { text: 'Status', key: 'PaymentStatus', type: 'label' },
                        { text: 'Ticket ID', key: 'Emp_Ticket_ID', type: 'morelinks', templateUrl: model.Ticketpopupupdate },
                        { text: 'Agreed', key: 'AgreedAmount', type: 'label' },
                        { text: 'Paid', key: 'PaidAmount', type: 'label' },
                        { text: 'Duration', key: 'ValidMonths', type: 'label' },
                        { text: 'Date', key: 'PaymentDate', type: 'label' },
                        { text: 'Expiry On', key: 'ExpiryOn', type: 'label' },
                        { text: 'SA', key: 'SAForm', type: 'morelinks', templateUrl: model.SaFormTemplate },
                        { text: '', key: 'Description', type: 'morelinks', templateUrl: model.linktemplate }
                    ];

                    paymentAuthorizationService.CustomerUnauthorizedPayments(inObj).then(function(response) {
                        model.isDisabledsubmit = false;
                        if (response.data) {
                            if ((response.data[0]).length) {
                                if (type === 'export') {
                                    model.exportarray = [];
                                    model.exportarray = (response.data[0]);
                                    var options = {
                                        headers: true,
                                    };
                                    alasql('SELECT ProfileID as ProfileID,PaymentStatus as Status,AgreedAmount as Agreed,PaidAmount as Paid,ValidMonths as Duration,PaymentDate as Date,ExpiryOn as ExpiryOn,SAForm as SA,Description  INTO  XLSX("EditReports.xlsx",?) FROM ?', [options, model.exportarray]);
                                } else {
                                    model.TotalRows = (response.data[0]).length;
                                    model.mainArray = response.data[0];
                                    model.BranchmenuArr = response.data[1];
                                    model.gridTableshow = true;
                                    model.pageSize = 10;
                                    model.data = (response.data[0]);
                                    _.map(model.data, function(item, index) {
                                        item.rowIndex = index;
                                    });
                                    _.map(model.mainArray, function(item, index) {
                                        item.rowIndex = index;
                                    });
                                }

                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 4500);
                            }

                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 4500);
                        }
                    });
                };

                model.linktemplate = function(row) {
                    var auth = 'Authorize';
                    var Decline = 'Decline';
                    //var links = (AdminID && parseInt(AdminID) === 1) || Managementid === 'true' || row.SAForm ? "<a href='javascript:void(0);' ng-click='model.authorize(" + JSON.stringify(row) + "," + JSON.stringify(auth) + ");'>Authorize</a>&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.authorize(" + JSON.stringify(row) + "," + JSON.stringify(Decline) + ");'>Decline</a>" : '';
                    var links = (AdminID && parseInt(AdminID) === 1) || Managementid === 'true' || row.SAForm ? "<a href='javascript:void(0);' ng-click='model.authorizepopup(" + JSON.stringify(row) + "," + JSON.stringify(auth) + ",$index);'>Authorize</a>&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.authorizepopup(" + JSON.stringify(row) + "," + JSON.stringify(Decline) + ");'>Decline</a>" : '';
                    return links;
                };
                model.arrayToString = function(string) {
                    return string !== null && string !== "" && string !== undefined ? (string.split(',')).map(Number) : null;
                };
                model.authorizepopup = function(row, type, index) {
                    if (model.showempid === 2 || model.showempid === 90 || model.showempid === 146 || model.showempid === 223) {
                        model.employeenamesbind();
                        model.paymentverificationobj = row;
                        model.typeauthorize = type;
                        model.maketingticketverified = null;
                        model.rbtnmarketingtkted = null;
                        model.ticketamountforcustomer = row.WithTax;
                        // model.ticketownermarketing = row.AssignedToEmpID !== "" && row.AssignedToEmpID !== null ? parseInt(row.AssignedToEmpID) : "";
                        model.ticketownermarketing = row.AssignedToEmpID !== "" && row.AssignedToEmpID !== null ? model.arrayToString(row.AssignedToEmpID.toString()) : "";

                        model.ticketidmarketing = row.TicketName;
                        model.oldticketidmarketing = row.TicketName;
                        model.index = row.rowIndex;
                        model.ticketiddisable = true;
                        modelpopupopenmethod.showPopupphotopoup('authorizePopupticket.html', model.scope, 'md', "modalclassofedit");
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'please Contact Admin employees', 4500);
                    }
                };

                model.SaFormTemplate = function(row) {
                    var sa = row.SAForm !== "" && row.SAForm !== null && row.SAForm !== undefined ? "<a href='javascript:void(0);' ng-click='model.showSAmethod(" + JSON.stringify(row.SAForm) + ");'>SA Form</a>" : "<p class='unpaid'>NoSAForm</p>";
                    return sa;

                };
                model.showSAmethod = function(Settle) {
                    model.image = Settle;
                    modelpopupopenmethod.showPopup('templates/bindImagePopup.html', model.scope, 'md', '');
                };

                model.branchbind = function(val, type) {
                    model.type = type;
                    model.data = _.where(model.mainArray, { Branch_ID: parseInt(val) });
                    model.TotalRows = (model.data).length;
                    _.map(model.data, function(item, index) {
                        item.rowIndex = index;
                    });

                };
                model.authorize = function(row, type) {

                    var inputobj = {
                        PaymentID: row.Payment_ID,
                        PaymentHisID: row.PaymentHist_ID,
                        ProfileID: row.ProfileID,
                        CustID: row.CustomerID,
                        AutherizationDesc: '',
                        ExpiryDate: row.ExpiryOn,
                        PaymentStatus: type === 'Authorize' ? 1 : 0,
                        EmployeeID: empid
                    };

                    paymentAuthorizationService.submitAuthorization(inputobj).then(function(response) {
                        if (response.data) {
                            var msg = '';
                            var cls = '';
                            if (parseInt(response.data) === 1) {
                                msg = type === 'Authorize' ? 'Payment has been authorized successfully' : 'Payment has been declined successfully';
                            } else {
                                msg = type === 'Authorize' ? 'Error in authorizing the payment' : 'Error in declining the payment';
                            }
                            alertss.timeoutoldalerts(model.scope, parseInt(response.data) === 1 ? 'alert-success' : 'alert-danger', msg, 4500);
                        }
                    });
                };
                model.close = function() {
                    modelpopupopenmethod.closepopup();
                };
                model.employeenamesbind = function() {
                    if ((model.employeenamearray).length === 0) {
                        service.EmpBinding(1, 2, '').then(function(response) {
                            // model.employeenamearray.push({ "label": "--Select--", "title": "--Select--", "value": "" });
                            _.each(response.data, function(item) {
                                if (item.CountryCode === 'Profile Owner') {
                                    model.employeenamearray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                }
                            });
                        });
                    }
                };
                model.closepopup = function() {
                    modelpopupopenmethod.closepopuppoptopopup();
                };
                model.returnCount = function(val) {
                    return (_.where(model.mainArray, { BranchID: parseInt(val) })).length;
                    // return 1;
                };
                model.exportexcel = function(array, columns) {
                    model.paymentAuthSelect("export");
                };
                model.verifyticketupdate = function(pagemodel) {
                    model.inputobj = {
                        PaymentID: model.paymentverificationobj.Payment_ID,
                        PaymentHisID: model.paymentverificationobj.PaymentHist_ID,
                        ProfileID: model.paymentverificationobj.ProfileID,
                        CustID: model.paymentverificationobj.CustomerID,
                        AutherizationDesc: '',
                        ExpiryDate: model.paymentverificationobj.ExpiryOn,
                        PaymentStatus: model.typeauthorize === 'Authorize' ? 1 : 0,
                        EmployeeID: empid,
                        TicketID: model.paymentverificationobj.Emp_Ticket_ID,
                        TicketName: model.paymentverificationobj.TicketName,
                        TicketOwnerIDAmt_1: model.ticketownermarketing !== "" && model.ticketownermarketing !== '0' && model.ticketownermarketing !== 0 && model.ticketownermarketing !== undefined ? (model.ticketownermarketing.length > 1 ? model.ticketownermarketing[0].toString() : model.ticketownermarketing.toString()) + "," + (model.ticketamountforcustomer !== "" && model.ticketamountforcustomer !== null ? model.ticketamountforcustomer : null) : null,
                        TicketOwnerIDAmt_2: model.ticketownermarketing !== "" && model.ticketownermarketing !== '0' && model.ticketownermarketing !== 0 && model.ticketownermarketing !== undefined ? (model.ticketownermarketing.length > 1 ? model.ticketownermarketing[1].toString() : 0) + "," + (model.ticketamountforcustomer2 !== "" && model.ticketamountforcustomer2 !== null && model.ticketamountforcustomer2 !== undefined ? model.ticketamountforcustomer2 : 0) : null,
                        MrkTicketVerified: model.maketingticketverified ? (parseInt(model.rbtnmarketingtkted) === 1 ? 1 : model.maketingticketverified) : null,
                        Markedted: model.rbtnmarketingtkted ? model.rbtnmarketingtkted : null,
                        // TotalAmount_Ticket: model.ticketamountforcustomer !== "" && model.ticketamountforcustomer !== null ? model.ticketamountforcustomer : null
                    };
                    if (model.ticketownermarketing.length <= 2) {
                        paymentAuthorizationService.submitAuthorization(model.inputobj).then(function(response) {
                            if (response.data) {
                                var msg = '';
                                var cls = '';
                                if (parseInt(response.data) === 1) {
                                    model.closepopup();
                                    msg = model.typeauthorize === 'Authorize' ? 'Payment has been authorized successfully' : 'Payment has been declined successfully';
                                    alertss.timeoutoldalerts(model.scope, parseInt(response.data) === 1 ? 'alert-success' : 'alert-danger', msg, 2000);
                                    model.mainArray = _.difference(model.mainArray, _.where(model.data, { Emp_Ticket_ID: model.paymentverificationobj.Emp_Ticket_ID }));
                                    (model.data).splice(model.index, 1);
                                    if (model.typeauthorize === 'Authorize') {
                                        var msggg = 'Thank Your for Your registration and Payment For the services In kaakateeya.com....verified by "looged Username';
                                        paymentAuthorizationService.memoSubmit(msggg, model.paymentverificationobj.Emp_Ticket_ID, model.empid, "").then(function(res) {
                                            if (parseInt(res.data) === 1) {
                                                paymentAuthorizationService.Marketingticketstatus(model.paymentverificationobj.Emp_Ticket_ID, model.empid).then(function(reponsepayment) {});
                                            }
                                        });
                                    }
                                } else {
                                    msg = model.typeauthorize === 'Authorize' ? 'Error in authorizing the payment' : 'Error in declining the payment';
                                    alertss.timeoutoldalerts(model.scope, parseInt(response.data) === 1 ? 'alert-success' : 'alert-danger', msg, 2000);
                                }
                            }
                        });
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'We Can not Select More Than Two Employees', 4500);
                    }
                };

                model.checkticket = function(ticketID) {
                    paymentAuthorizationService.checkmarketingTicket(ticketID).then(function(respo) {
                        if (parseInt(respo.data) === 0) {
                            model.ticketidmarketing = model.oldticketidmarketing;
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter correct TicketID', 4500);
                        }
                    });
                };
                model.marketingticketchange = function() {
                    if (model.ticketownermarketing.length > 2) {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'We Can not Select More Than Two Employees', 4500);
                        // timeout(function() {
                        //     model.ticketownermarketing = [];
                        // }, 100);
                    }
                };
                return model;
            }
        ]);
})();