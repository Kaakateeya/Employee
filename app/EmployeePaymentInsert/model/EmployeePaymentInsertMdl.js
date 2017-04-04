(function() {
    'use strict';

    function factory(EmployeePaymentInsertservice, stateParams, filter, authSvc) {
        debugger;
        var model = {};
        model.obj = {};
        model.array = [];
        model.scope = {};
        model.custobj = {};
        model.PiObj = {};
        model.paymentpoints = app.paymentPoints;
        model.ExpiryDate = '';
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.ServiceTaxPercent = app.ServiceTaxPercent;

        model.EmployeePaymentInsert = function(inobj, type) {
            var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                DateArr, dateformatt = '';
            if (model.custobj.StartDate !== null && model.custobj.StartDate !== '') {
                DateArr = model.custobj.StartDate.split('-');
                dateformatt = DateArr[0] + '/' + ((_.indexOf(monthArr, DateArr[1])) + 1) + '/' + DateArr[2];
            }

            debugger;
            var obj = {
                ProfileID: model.custobj.ProfileID,
                Cust_id: model.custobj.Cust_ID,
                Payment_Id: stateParams.paymentID === '0' || stateParams.paymentID === 0 ? '' : stateParams.paymentID,
                Renual_Type: stateParams.status,
                NoofPoints: parseInt(inobj.txtAmountPaid * model.paymentpoints),
                AgreedAmount: inobj.txtAgreedAmt,
                SettlementAmount: inobj.txtSettlementAmount,
                DateDuration: model.ExpiryDate,
                ServiceTax: inobj.rdnServicetax,
                ServiceTaxAmt: inobj.rdnServicetax === '1' ? parseInt(inobj.txtAmountPaid * model.ServiceTaxPercent) : 0,
                AmountPaid: inobj.txtAmountPaid,
                StartDate: dateformatt,
                //  dateformatt !== '' && dateformatt !== null ? filter('date')(dateformatt, 'MM/dd/yyyy') : null,
                EndDate: moment(model.custobj.EndDate).format('DD/MM/YYYY'),
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
            console.log(JSON.stringify(obj));
            model.PiObj = {};
            debugger;
            //   EmployeePaymentInsertservice.paymentInsert(obj).then(function(response) {
            //console.log(response);
            alert('submited successfully');
            model.PiObj.txtAgreedAmt = '';

            this.paymentForm.$setPristine();
            this.paymentForm.$setUntouched();
            this.paymentForm.$setinValidity();

            // if (response.data === 1 || response.data === '1') {
            //     alert('submited successfully');
            //     model.PiObj = {};
            // } else {
            //     alert('submission failed');
            // }
            // });

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

        model.PaidAmtChange = function(val, agreeAmt) {;
            debugger;
            if (agreeAmt === '' || agreeAmt === undefined) {
                model.PiObj.txtAmountPaid = '';
                alert('Please enter  Agreed amount');
            }
            if (parseInt(val) > parseInt(agreeAmt)) {
                model.PiObj.txtAmountPaid = '';
                alert('Please enter paid amount less than Agreed amount');
            } else {
                var num = val * app.PaymentDays;
                //val / 100;
                model.ExpiryDate = moment().add(parseInt(num), 'days').format('DD-MM-YYYY');

            }

        };




        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentInsertModel', factory)
    factory.$inject = ['EmployeePaymentinsertservice', '$stateParams', '$filter', 'authSvc'];
})(angular);