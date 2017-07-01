(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('paymentAuthorizationModel', ['paymentAuthorizationService', 'Commondependency', 'complex-grid-config', 'modelpopupopenmethod', 'authSvc', 'alert', function(paymentAuthorizationService, Commondependency, config, modelpopupopenmethod, authSvc, alertss) {
            var model = {};
            var empid;
            model.scope = {};
            model.showsearchrows = true;
            model.showsearch = false;
            model.showpaging = false;
            model.showClientpaging = false;
            model.myprofileexcel = false;
            model.normalexcel = false;
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
                model.paymentAuthSelect();
                return model;
            };
            model.paymentAuthSelect = function(type) {
                var inObj = {
                    BranchID: model.branch ? model.branch : '',
                    StartDate: model.startDate ? model.startDate : '',
                    EndDate: model.endDate ? model.endDate : '',
                    Region: model.rdnRegion ? model.rdnRegion : ''
                };

                model.columns = [{ text: 'Profile ID', key: 'ProfileID', type: 'label' },
                    { text: 'Status', key: 'PaymentStatus', type: 'label' },
                    { text: 'Agreed', key: 'AgreedAmount', type: 'label' },
                    { text: 'Paid', key: 'PaidAmount', type: 'label' },
                    { text: 'Duration', key: 'ValidMonths', type: 'label' },
                    { text: 'Date', key: 'PaymentDate', type: 'label' },
                    { text: 'Expiry On', key: 'ExpiryOn', type: 'label' },
                    { text: 'SA', key: 'SAForm', type: 'morelinks', templateUrl: model.SaFormTemplate },
                    { text: '', key: 'Description', type: 'morelinks', templateUrl: model.linktemplate }
                ];

                paymentAuthorizationService.CustomerUnauthorizedPayments(inObj).then(function(response) {
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
                                model.data = (response.data[0]);
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
                var links = (AdminID && parseInt(AdminID) === 1) || Managementid === 'true' || row.SAForm ? "<a href='javascript:void(0);' ng-click='model.authorize(" + JSON.stringify(row) + "," + JSON.stringify(auth) + ");'>Authorize</a>&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.authorize(" + JSON.stringify(row) + "," + JSON.stringify(Decline) + ");'>Decline</a>" : '';
                return links;
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
            };
            model.authorize = function(row, type) {

                var inputobj = {
                    PaymentID: row.PaymentID,
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


            model.returnCount = function(val) {
                return (_.where(model.mainArray, { BranchID: parseInt(val) })).length;
                // return 1;
            };


            model.exportexcel = function(array, columns) {
                model.paymentAuthSelect("export");
            };



            return model;
        }]);
})();