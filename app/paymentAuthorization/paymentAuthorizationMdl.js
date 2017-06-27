(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentAuthorizationModel', factory);

    factory.$inject = ['paymentAuthorizationService', 'Commondependency', 'complex-grid-config', 'modelpopupopenmethod', 'authSvc', 'alert'];

    function factory(paymentAuthorizationService, Commondependency, config, modelpopupopenmethod, authSvc, alertss) {
        return function() {
            var model = {};
            var empid;
            model = config;
            model.scope = {};
            model.showsearchrows = true;
            model.showsearch = true;
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
            model.paymentAuthSelect = function() {
                var inObj = {
                    BranchID: model.branch ? model.branch : '',
                    StartDate: model.startDate ? model.startDate : '',
                    EndDate: model.endDate ? model.endDate : '',
                    Region: model.rdnRegion ? model.rdnRegion : ''
                };

                model.columns = [{ text: 'Profile ID', key: 'ProfileID', type: 'label' },
                    { text: 'Status', key: 'PaymentStatus', type: 'label' },
                    { text: 'Agreed Amount', key: 'AgreedAmount', type: 'label' },
                    { text: 'Paid Amount', key: 'PaidAmount', type: 'label' },
                    { text: 'Valid Months', key: 'ValidMonths', type: 'label' },
                    { text: 'Payment Date', key: 'PaymentDate', type: 'label' },
                    { text: 'Expiry On', key: 'ExpiryOn', type: 'label' },
                    // { text: 'Payment ID', key: 'PaymentID', type: 'label' },
                    { text: 'SA Form', key: 'SAForm', type: 'morelinks', templateUrl: model.SaFormTemplate },
                    { text: '', key: 'Description', type: 'morelinks', templateUrl: model.linktemplate }
                ];

                paymentAuthorizationService.CustomerUnauthorizedPayments(inObj).then(function(response) {
                    if (response.data) {
                        console.log(response.data[1]);
                        console.log(response.data[0]);
                        if ((response.data[0]).length) {
                            model.TotalRows = (response.data[0]).length;
                            model.mainArray = response.data[0];
                            model.BranchmenuArr = response.data[1];
                            model.gridTableshow = true;
                            model.setData((response.data[0]));
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
                model.data = _.where(model.mainArray, { BranchID: parseInt(val) });
                model.TotalRows = (model.data).length;
            };

            model.authorize = function(row, type) {

                model.pPaymentID = row.PaymentID;
                model.pProfileID = row.ProfileID;
                model.pTicketID = '';
                model.pMarketedBy = '';
                model.pAgreementAmt = row.AgreedAmount1;
                model.pPaidAmt = row.PaidAmount ? parseInt(row.PaidAmount) : '';
                model.pSettlementAmt = row.SettlementAmount;
                model.pServiceTax = row.ServiceTax;
                model.pNoofOnlinePoints = row.OnlinePoints;
                model.pOfflinePts = row.OfflinePoints;

                model.CustomerID = row.CustomerID;
                model.MembershipID = row.MembershipID;
                model.PaymentStatus = row.PaymentStatus;
                model.ExpiryDate = row.ExpiryOn;
                model.CustMembershipID = row.CustMembershipID;
                model.MembershipDiscountID = row.MembershipDiscountID;

                model.pType = type;

                modelpopupopenmethod.showPopup('authorizePopup.html', model.scope, 'lg', "paymentAuthorizeCls");
            };
            model.close = function() {
                modelpopupopenmethod.closepopup();
            };
            model.SubmitAuthorization = function() {
                var inObj = {};
                inObj = {
                    PaymentID: model.pPaymentID,
                    ProfileID: model.pProfileID,
                    TicketID: model.pTicketID,
                    MarketedByID: model.pMarketedBy,
                    CustomerID: model.CustomerID,
                    MembershipID: model.MembershipID,
                    MembershipDiscountID: model.MembershipDiscountID,
                    AgreedAmount: model.pAgreementAmt,
                    PaidAmount: model.pPaidAmt,
                    SettlementAmount: model.pSettlementAmt,
                    ServiceTax: model.pServiceTax,
                    OnlinePoints: model.pNoofOnlinePoints,
                    OfflinePoints: model.pOfflinePts,
                    AutherizationDesc: model.pAuthorizationDescription,
                    ExpiryDate: model.ExpiryDate,
                    PaymentStatus: model.pType === 'Authorize' ? 1 : 0,
                    EmployeeID: empid,
                    CustMembershipID: model.CustMembershipID
                };

                paymentAuthorizationService.submitAuthorization(inObj).then(function(response) {
                    if (response.data) {
                        var msg = '';
                        var cls = '';
                        model.close();
                        if (parseInt(response.data) === 1) {
                            msg = model.pType === 'Authorize' ? 'Payment has been authorized successfully' : 'Payment has been declined successfully';
                        } else {
                            msg = model.pType === 'Authorize' ? 'Error in authorizing the payment' : 'Error in declining the payment';
                        }
                        alertss.timeoutoldalerts(model.scope, parseInt(response.data) === 1 ? 'alert-success' : 'alert-danger', msg, 4500);
                    }
                });
            };

            model.returnCount = function(val) {
                return (_.where(model.mainArray, { BranchID: parseInt(val) })).length;
                // return 1;
            };


            return model.init();
        };
    }
})();