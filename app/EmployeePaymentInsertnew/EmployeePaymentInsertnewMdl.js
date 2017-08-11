(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentInsertnewModel', factory);

    factory.$inject = ['EmployeePaymentInsertnewService', '$stateParams', '$filter', 'authSvc', 'modelpopupopenmethod', 'alert', 'paymentProperty'];

    function factory(EmployeePaymentInsertservice, stateParams, filter, authSvc, modelpopupopenmethod, alertss, paymentProperty) {
        var model = {};
        model.obj = {};
        model.array = [];
        model.scope = {};
        model.custobj = {};
        model.PiObj = {};
        model.paymentpoints = app.paymentPoints;
        model.paymentDays = app.PaymentDays;
        model.ExpiryDate = '';
        model.ExpiryDaterev = '';
        model.parseInt = parseInt;
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.isManagement = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
        model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
        model.ServiceTaxPercent = app.ServiceTaxPercent;

        model.EmployeePaymentInsert = function(inobj, type) {
            var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                DateArr, dateformatt = '';
            if (model.ExpiryDaterev === '') {
                model.PaidAmtChange(inobj.txtAmountPaid, inobj.txtAgreedAmt);
            }
            var obj = {
                ProfileID: model.custobj.ProfileID,
                Cust_id: model.custobj.Cust_ID,
                Payment_Id: stateParams.paymentID === '0' || stateParams.paymentID === 0 ? '' : stateParams.paymentID,
                Renual_Type: stateParams.status,
                NoofPoints: parseInt(inobj.txtAmountPaid * model.paymentpoints),
                AgreedAmount: inobj.txtAgreedAmt,
                SettlementAmount: inobj.txtSettlementAmount,
                DateDuration: model.ExpiryDaterev,
                ServiceTax: inobj.rdnServicetax,
                // ServiceTaxAmt: inobj.rdnServicetax === '1' ? parseInt(inobj.txtAmountPaid * model.ServiceTaxPercent) : 0,
                AmountPaid: inobj.txtAmountPaid,
                StartDate: model.StartDateparam,
                EndDate: model.endDateparam,
                ReceiptNumber: inobj.txtbillno,
                TransactionID: inobj.txttransactionid,
                ChequeNoOrDDNo: inobj.txtcheckno,
                BranchName: inobj.txtbranch,
                BankName: inobj.txtbankname,
                Place: inobj.txtplace,
                Paydescription: inobj.txtpayDescription,
                ModeOfPayment: inobj.rbtnPaymode,
                EmpID: model.empid,
                AccessFeatureID: 0,
                PaysmsID: inobj.rbtnmail,
                MembershipDuration: parseInt(model.noofDays),
                PaymentHist_ID: 0
                    // model.custobj.PaymentHist_ID
            };
            model.PiObj = {};
            model.PiObj.rbtnmail = 1;
            EmployeePaymentInsertservice.paymentInsert(obj).then(function(response) {
                model.scope.paymentForm.$setPristine();
                model.scope.paymentForm.$setUntouched();
                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Payment Entered Successfully ', 4500);
                window.open("EmployeePayments" + "?idsss=" + model.custobj.ProfileID, "_blank");
                // if (response.data === 1 || response.data === '1') {
                //     alert('submited successfully');
                //     model.PiObj = {};
                // } else {
                //     alert('submission failed');
                // }
            });
        };
        model.getpaymentProfile = function(profileID) {
            model.paymentID = stateParams.paymentID;
            model.custobj = {};
            model.PiObj.rdnServicetax = '1';
            EmployeePaymentInsertservice.getEmployeePaymentdata(profileID, 0).then(function(response) {
                if (response.data[0] !== undefined && response.data[0].length > 0 && JSON.parse(response.data[0]).length > 0) {
                    console.log(JSON.parse(response.data[0]));
                    var arraymodify = [];
                    arraymodify = _.where(JSON.parse(response.data[0]), { PaymentHist_ID: parseInt(stateParams.histryid === '0' || stateParams.histryid === 0 ? '' : stateParams.histryid) });
                    if (arraymodify.length === 0) {
                        model.custobj = JSON.parse(response.data[0])[0];
                        model.paymentpoints = parseInt(model.custobj.CasteID) === 402 ? app.kammaPaymentPoints : app.paymentPoints;
                        model.paymentDays = parseInt(model.custobj.CasteID) === 402 ? app.kammaPaymentDays : app.PaymentDays;
                    } else {
                        model.custobj = arraymodify[0];
                        model.paymentpoints = parseInt(model.custobj.CasteID) === 402 ? app.kammaPaymentPoints : app.paymentPoints;
                        model.paymentDays = parseInt(model.custobj.CasteID) === 402 ? app.kammaPaymentDays : app.PaymentDays;
                        model.showOfferDetails(model.custobj.Price, 'pageload', model.custobj.Expirydate);
                        model.PiObj.txtAgreedAmt = model.custobj.AgreedAmount;
                        model.PiObj.txtAmountPaid = parseInt(stateParams.paymentID) !== 0 ? model.custobj.AgreedAmount - model.custobj.Price : model.custobj.Price;
                        model.PiObj.balamountpaid = model.custobj.Price;
                        // model.PiObj.balamountpaidamount = model.custobj.Price;
                        model.PiObj.rdnServicetax = model.custobj.ServiceTax !== null ? 1 : 0;
                        model.PiObj.txtpayDescription = model.custobj.MemberShipDescription;
                        model.PiObj.txtSettlementAmount = model.custobj.SettlementAmount ? model.custobj.SettlementAmount : '';
                        //model.strPoints = parseInt(stateParams.paymentID) !== 0 ? parseInt(Amt * model.paymentpoints) : 0;
                        if (parseInt(stateParams.paymentID) === 0) {
                            model.PiObj.txtAgreedAmt = '';
                            model.PiObj.txtAmountPaid = '';
                            model.PiObj.txtpayDescription = '';
                        }
                    }
                }
            });
        };
        model.PaidAmtChange = function(paidAmt, agreeAmt) {
            if (agreeAmt === '' || agreeAmt === undefined) {
                model.PiObj.txtAmountPaid = '';
                alert('Please enter  Agreed amount');
            }
            if (parseInt(paidAmt) > parseInt(agreeAmt)) {
                model.PiObj.txtAmountPaid = '';
                alert('Please enter paid amount less than Agreed amount');
            } else {
                if (parseInt(paidAmt) !== agreeAmt) {
                    model.showOfferDetails(paidAmt, 'Paid', model.custobj.Expirydate);
                }
                var num = paidAmt * model.paymentDays;
                num = num <= 7 ? 7 : num;
                model.ExpiryDate = moment().add(parseInt(num), 'days').format('MM-DD-YYYY');
                var olddate = moment(model.custobj.Expirydate).format('MM-DD-YYYY');
                var curdate = moment().format('MM-DD-YYYY');
                //  model.PiObj.balamountpaidamount = parseInt(model.PiObj.balamountpaid) - parseInt(model.PiObj.txtAmountPaid);
                if (model.custobj.Expirydate) {
                    var datebool = moment(curdate).isSame(olddate);
                    if (datebool || (moment(olddate).isBefore(curdate))) {
                        model.StartDateparam = curdate;
                        model.endDateparam = moment(curdate).add(7, 'days').format('MM-DD-YYYY');
                        model.ExpiryDaterev = moment().add(parseInt(num), 'days').format('MM-DD-YYYY');
                    } else {
                        model.StartDateparam = olddate;
                        model.endDateparam = moment(olddate).add(7, 'days').format('MM-DD-YYYY');
                        model.ExpiryDaterev = moment(model.custobj.Expirydate).add(parseInt(num), 'days').format('MM-DD-YYYY');
                    }
                } else {
                    model.StartDateparam = curdate;
                    model.endDateparam = moment().add(7, 'days').format('MM-DD-YYYY');
                    model.ExpiryDaterev = moment().add(parseInt(num), 'days').format('MM-DD-YYYY');
                }
                model.noofDays = num;
            }
        };
        model.showOfferDetails = function(Amt, type, expiryDate) {
            if (Amt !== undefined && Amt !== '') {
                var num = Amt * model.paymentDays;
                num = num <= 7 ? 7 : num;
                model.strAmt = Amt;
                if (expiryDate && type === 'pageload' && parseInt(stateParams.paymentID) !== 0) {
                    model.strDate = moment(expiryDate).format('DD-MM-YYYY');
                } else if (expiryDate && type !== 'pageload') {
                    var olddate = moment(expiryDate).format('MM-DD-YYYY');
                    var curdate = moment().format('MM-DD-YYYY');
                    var datebool = moment(curdate).isSame(olddate);
                    if (datebool || (moment(olddate).isBefore(curdate))) {
                        model.strDate = moment().add(parseInt(num), 'days').format('MM-DD-YYYY');
                    } else {
                        model.strDate = moment(expiryDate).add(parseInt(num), 'days').format('MM-DD-YYYY');
                    }
                    model.strDate = moment(model.strDate).format('DD-MM-YYYY');
                } else if (parseInt(stateParams.paymentID) !== 0) {
                    model.strDate = moment().add(parseInt(num), 'days').format('DD-MM-YYYY');
                }
                model.strPoints = parseInt(Amt * model.paymentpoints);
                var infm = 'Agreed Amount : ' + Amt + '    \n     No of Points : ' + model.strPoints + '    \n Expiry Date : ' + model.strDate;
                if (type === 'Agreed' || type === 'Paid') {
                    model.typeTxt = type;
                    //modelpopupopenmethod.showPopup('alert.html', model.scope, 'sm', '');
                }
            }
        };
        model.closepopup = function() {
            modelpopupopenmethod.closepopup();
        };
        model.resetemployeepaymetinsert = function() {
            //model.PiObj = {};
            model.PiObj.txtAgreedAmt = model.custobj.AgreedAmount;
            model.PiObj.txtAmountPaid = parseInt(stateParams.paymentID) !== 0 ? model.custobj.AgreedAmount - model.custobj.Price : model.custobj.Price;
            model.PiObj.txtSettlementAmount = parseInt(stateParams.paymentID) !== 0 ? model.custobj.SettlementAmount : "";
            model.PiObj.rbtnPaymode = "";
            model.PiObj.rbtnmail = "";
            model.PiObj.txtbillno = "";
            model.PiObj.txttransactionid = "";
            model.PiObj.txtcheckno = "";
            model.PiObj.txtbankname = "";
            model.PiObj.txtbranch = "";
            model.PiObj.txtplace = "";
            model.PiObj.txtpayDescription = "";
            model.PiObj.rdnServicetax = 1;
            model.scope.paymentForm.$setPristine();
            model.scope.paymentForm.$setUntouched();
        };
        return model;
    }
})();