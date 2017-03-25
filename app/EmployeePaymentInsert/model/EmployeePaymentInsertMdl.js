(function() {
    'use strict';

    function factory(EmployeePaymentInsertservice, stateParams) {
        debugger;
        var model = {};
        model.obj = {};
        model.array = [];
        model.scope = {};
        model.custobj = {};
        model.PiObj = {};

        model.EmployeePaymentInsert = function(inobj, type) {

            var obj = {
                ProfileID: model.custobj.ProfileID,
                Cust_id: model.custobj.Cust_ID,
                Payment_Id: model.custobj.Payment_ID,
                Renual_Type: model.custobj.MemberShipTypeID,
                NoofPoints: inobj.txtNoofpoints,
                AgreedAmount: inobj.txtAgreedAmt,
                SettlementAmount: inobj.txtSettlementAmount,
                DateDuration: model.custobj.Duration,
                ServiceTax: inobj.txtServicetax,
                ServiceTaxAmt: inobj.txtServiceTaxAmt,
                AmountPaid: inobj.txtAmountPaid,
                StartDate: model.custobj.StartDate,
                EndDate: model.custobj.EndDate,
                ReceiptNumber: inobj.txtbillno,
                TransactionID: inobj.txttransactionid,
                ChequeNoOrDDNo: inobj.txtcheckno,
                BranchName: inobj.txtbranch,
                BankName: inobj.txtbankname,
                Place: inobj.txtplace,
                Paydescription: inobj.txtpayDescription,
                ModeOfPayment: inobj.rbtnPaymode,
                EmpID: 2,
                AccessFeatureID: '',
                PaysmsID: inobj.rbtnmail
            };
            EmployeePaymentInsertservice.paymentInsert(obj).then(function(response) {
                console.log(response);
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

        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentInsertModel', factory)
    factory.$inject = ['EmployeePaymentservice', '$stateParams'];
})(angular);