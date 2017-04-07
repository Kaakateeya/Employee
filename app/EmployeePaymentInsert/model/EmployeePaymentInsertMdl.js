(function() {
    'use strict';

    function factory(EmployeePaymentInsertservice, stateParams, filter, authSvc, modelpopupopenmethod) {

        var model = {};
        model.obj = {};
        model.array = [];
        model.scope = {};
        model.custobj = {};
        model.PiObj = {};
        model.paymentpoints = app.paymentPoints;
        model.ExpiryDate = '';
        model.ExpiryDaterev = '';
        model.parseInt = parseInt;
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.ServiceTaxPercent = app.ServiceTaxPercent;

        model.EmployeePaymentInsert = function(inobj, type) {
            var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                DateArr, dateformatt = '';
            if (model.custobj.StartDate !== null && model.custobj.StartDate !== '') {
                DateArr = model.custobj.StartDate.split('-');
                dateformatt = DateArr[0] + '/' + ((_.indexOf(monthArr, DateArr[1])) + 1) + '/' + DateArr[2];
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
                ServiceTaxAmt: inobj.rdnServicetax === '1' ? parseInt(inobj.txtAmountPaid * model.ServiceTaxPercent) : 0,
                AmountPaid: inobj.txtAmountPaid,
                StartDate: dateformatt,
                //  dateformatt !== '' && dateformatt !== null ? filter('date')(dateformatt, 'MM/dd/yyyy') : null,
                EndDate: moment(model.custobj.EndDate).format('DD/MM/YYYY') === 'Invalid date' ? '' : moment(model.custobj.EndDate).format('DD/MM/YYYY'),
                //  model.custobj.EndDate !== '' && model.custobj.EndDate !== null ? filter('date')(model.custobj.EndDate, 'MM/dd/yyyy') : null,
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
                PaysmsID: inobj.rbtnmail
            };

            model.PiObj = {};
            EmployeePaymentInsertservice.paymentInsert(obj).then(function(response) {

                alert('Payment Entered Successfully');
                model.scope.paymentForm.$setPristine();
                model.scope.paymentForm.$setUntouched();
                // if (response.data === 1 || response.data === '1') {
                //     alert('submited successfully');
                //     model.PiObj = {};
                // } else {
                //     alert('submission failed');
                // }
            });

        };

        model.getpaymentProfile = function(profileID) {
            model.custobj = {};
            model.PiObj.rdnServicetax = '1';
            EmployeePaymentInsertservice.getEmployeePaymentdata(profileID).then(function(response) {
                if (response.data[0] !== undefined && response.data[0].length > 0 && JSON.parse(response.data[0]).length > 0) {
                    var arraymodify = [];
                    arraymodify = _.where(JSON.parse(response.data[0]), { Payment_ID: parseInt(stateParams.paymentID === '0' || stateParams.paymentID === 0 ? '' : stateParams.paymentID) });
                    if (arraymodify.length === 0) {
                        model.custobj = JSON.parse(response.data[0])[0];
                    } else {
                        model.custobj = arraymodify[0];
                        model.showOfferDetails(model.custobj.Price, 'pageload');
                        model.PiObj.txtAgreedAmt = model.custobj.AgreedAmount;
                        model.PiObj.txtAmountPaid = model.custobj.Price;
                    }
                    console.log(model.custobj);
                }

            });
        };

        model.PaidAmtChange = function(paidAmt, agreeAmt) {;
            if (agreeAmt === '' || agreeAmt === undefined) {
                model.PiObj.txtAmountPaid = '';
                alert('Please enter  Agreed amount');
            }
            if (parseInt(paidAmt) > parseInt(agreeAmt)) {
                model.PiObj.txtAmountPaid = '';
                alert('Please enter paid amount less than Agreed amount');
            } else {
                if (parseInt(paidAmt) !== agreeAmt) {
                    model.showOfferDetails(paidAmt);
                }
                var num = paidAmt * app.PaymentDays;
                model.ExpiryDate = moment().add(parseInt(num), 'days').format('DD-MM-YYYY');
                model.ExpiryDaterev = moment().add(parseInt(num), 'days').format('MM-DD-YYYY');

            }

        };
        model.showOfferDetails = function(Amt, type) {
            if (Amt !== undefined && Amt !== '') {
                var num = Amt * app.PaymentDays;
                model.strAmt = Amt;
                model.strDate = moment().add(parseInt(num), 'days').format('DD-MM-YYYY');
                model.strPoints = parseInt(Amt * model.paymentpoints);
                var infm = 'Agreed Amount : ' + Amt + '    \n     No of Points : ' + model.strPoints + '    \n Expiry Date : ' + model.strDate;
                if (type === undefined) {
                    // alert(infm);
                    // alertss.timeoutoldalerts(model.scope, 'alert-success', infm, 9500);
                    modelpopupopenmethod.showPopup('alert.html', model.scope, 'sm', '');

                }
            }

        };
        model.closepopup = function() {
            modelpopupopenmethod.closepopup();
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentInsertModel', factory)
    factory.$inject = ['EmployeePaymentinsertservice', '$stateParams', '$filter', 'authSvc', 'modelpopupopenmethod'];
})(angular);