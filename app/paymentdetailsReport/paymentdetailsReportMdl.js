(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentdetailsReportModel', ['paymentdetailsReportService',
            'complex-grid-config', 'arrayConstants',

            function(paymentdetailsReportService, configgrid, arrayConstants) {
                var model = {};
                model.showsearchrows = true;
                model.showsearch = true;
                model.showpaging = true;
                model.showClientpaging = false;
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
                    model.rbtnModeOfPayment = "0";
                    _.each(model.Brancharray, function(item) {
                        model.branchids.push(item.value);
                    });
                };
                model.pageloadbindings = function() {
                    model.Applicationstatus = [];
                    model.Applicationstatus = arrayConstants.Applicationstatus;
                    paymentdetailsReportService.getMyprofilebind(1, 2, '').then(function(response) {
                        model.Brancharray = [];
                        _.each(response.data, function(item) {
                            switch (item.CountryCode) {
                                case "Branch":
                                    model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
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
                model.paymentreports = function(from, to) {
                    model.panelbodyhide = false;
                    model.data = [];
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
                        { text: 'Marktd by', key: 'marktby', type: 'label' },

                        { text: 'Pay for', key: 'PayFor', type: 'label' },
                        { text: 'Owner of the profile', key: 'ProfileOwner', type: 'label' },
                        { text: 'Send message', key: 'marktby', type: 'label' },
                        { text: 'Send email', key: 'marktby', type: 'label' }
                    ];
                    var obj = {
                        StrProfileID: model.txtprofileidpaymentreport !== null && model.txtprofileidpaymentreport !== undefined && model.txtprofileidpaymentreport !== "" ? model.txtprofileidpaymentreport : null,
                        IsAdmin: model.empid,
                        Gender: model.rbtngender !== null && model.rbtngender !== undefined && model.rbtngender !== "" && model.rbtngender !== "0" ? model.rbtngender : null,
                        PayFor: null,
                        PaymenytStatus: model.rbtnpaymentstatus !== null && model.rbtnpaymentstatus !== "" && model.rbtnpaymentstatus !== undefined && model.rbtnpaymentstatus !== "0" ? model.rbtnpaymentstatus : null,
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
                        StartDate: model.txtpaymentfrom !== "" && model.txtpaymentfrom !== null && model.txtpaymentfrom !== undefined ? model.txtpaymentfrom : null,
                        EndDate: model.txtpaymentto !== "" && model.txtpaymentto !== null && model.txtpaymentto !== undefined ? model.txtpaymentto : null,
                        From: from,
                        To: to,
                        PageNumber: 1,
                        PageSize: 100,
                        flag: 0,
                        ModeOfPaymentID: model.rbtnModeOfPayment !== null && model.rbtnModeOfPayment !== "" && model.rbtnModeOfPayment !== undefined && model.rbtnModeOfPayment !== "0" ? model.rbtnModeOfPayment : null
                    };
                    paymentdetailsReportService.EmplyeepaymentReportspayment(obj).then(function(response) {
                        console.log(response);
                        if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" &&
                            response.data[0] !== undefined && response.data[0] !== null && response.data[0].length > 0) {
                            model.TotalRows = response.data[0].length;
                            model.data = response.data[0];
                        }
                    });
                };
                return model;
            }
        ]);
})();