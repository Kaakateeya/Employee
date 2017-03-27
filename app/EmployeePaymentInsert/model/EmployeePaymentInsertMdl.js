(function() {
    'use strict';

    function factory(EmployeePaymentInsertservice, stateParams, filter) {
        debugger;
        var model = {};
        model.obj = {};
        model.array = [];
        model.scope = {};
        model.custobj = {};
        model.PiObj = {};
        model.paymentpoints = app.paymentPoints;
        model.ExpiryDate = '';

        model.ServiceTaxPercent = app.ServiceTaxPercent;

        model.EmployeePaymentInsert = function(inobj, type) {
            var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                DateArr, dateformatt = null;
            if (model.custobj.StartDate !== null && model.custobj.StartDate !== '') {
                DateArr = model.custobj.StartDate.split('-');
                dateformatt = DateArr[0] + '/' + ((_.indexOf(monthArr, DateArr[1])) + 1) + '/' + DateArr[2];
            }

            var obj = {
                ProfileID: model.custobj.ProfileID,
                Cust_id: model.custobj.Cust_ID,
                Payment_Id: model.custobj.Payment_ID,
                Renual_Type: model.custobj.MemberShipTypeID,
                NoofPoints: parseInt(inobj.txtAmountPaid / model.paymentpoints),
                AgreedAmount: inobj.txtAgreedAmt,
                SettlementAmount: inobj.txtSettlementAmount,
                DateDuration: parseInt((inobj.txtAmountPaid / 100) * 30),
                ServiceTax: inobj.rdnServicetax,
                ServiceTaxAmt: inobj.rdnServicetax === '1' ? parseInt(inobj.txtAmountPaid * model.ServiceTaxPercent) : 0,
                AmountPaid: inobj.txtAmountPaid,
                StartDate: dateformatt !== '' && dateformatt !== null ? filter('date')(dateformatt, 'MM/dd/yyyy') : null,
                //model.custobj.StartDate,
                EndDate: model.custobj.EndDate !== '' && model.custobj.EndDate !== null ? filter('date')(model.custobj.EndDate, 'MM/dd/yyyy') : null,
                // model.custobj.EndDate,
                ReceiptNumber: inobj.txtbillno,
                TransactionID: inobj.txttransactionid,
                ChequeNoOrDDNo: inobj.txtcheckno,
                BranchName: inobj.txtbranch,
                BankName: inobj.txtbankname,
                Place: inobj.txtplace,
                Paydescription: inobj.txtpayDescription,
                ModeOfPayment: inobj.rbtnPaymode,
                EmpID: 2,
                AccessFeatureID: 0,
                PaysmsID: inobj.rbtnmail
            };
            console.log(JSON.stringify(obj));
            EmployeePaymentInsertservice.paymentInsert(obj).then(function(response) {
                console.log(response);
                if (response.data === 1 || response.data === '1') {
                    alert('submited successfully');
                    model.PiObj = {};
                } else {
                    alert('submission failed');
                }
            });

        };

        model.getpaymentProfile = function(profileID) {
            model.custobj = {};

            EmployeePaymentInsertservice.getEmployeePaymentdata(profileID).then(function(response) {
                console.log(response);
                if (response.data[0] !== undefined && response.data[0].length > 0 && JSON.parse(response.data[0]).length > 0) {
                    model.custobj = JSON.parse(response.data[0])[0];
                }
                console.log(model.custobj);
            });
        };

        model.PaidAmtChange = function(val) {
            var num = val / 100;
            model.ExpiryDate = moment().add(parseInt(num), 'M').format('DD-MM-YYYY');

        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentInsertModel', factory)
    factory.$inject = ['EmployeePaymentinsertservice', '$stateParams', '$filter'];
})(angular);