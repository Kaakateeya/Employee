(function() {
    'use strict';

    function factory(http, EmployeePaymentservice, state, config, authSvc, singlegrid, modelpopupopenmethod) {
        return function() {
            var model = {};
            model = config;
            //
            model.singlegrid = singlegrid;
            model.singlegrid.showsearchrows = true;
            model.singlegrid.showsearch = true;
            model.singlegrid.showpaging = false;
            model.singlegrid.showClientpaging = false;
            model.singlegrid.myprofileexcel = false;
            model.singlegrid.normalexcel = false;
            model.singlegrid.gridTableshow = false;
            //
            model.obj = {};
            model.CustName = '';
            model.ProfileOwner = '';
            model.ProfileID = '';
            model.showsearchrows = false;
            model.showsearch = false;
            model.showpaging = false;
            model.myprofileexcel = false;
            model.normalexcel = false;
            model.paymentProfileID = function(row) {
                var status = row.membershiptype === 'Registration' ? 0 : 1;
                var paid = "<a style='cursor:pointer;'  href='/EmployeePaymentInserts/" + row.ProfileID + "/" + status + "/" + row.PaymentID + "'>Edit</a>";
                return paid;
            };
            model.expirydate = function(row) {
                var status = row.ExpiryDate !== undefined && row.ExpiryDate !== null && row.ExpiryDate !== "null" ? "/" + row.ExpiryDate : "";
                var paiddate = "<span>" + row.PaymentDate + status + "</span>";
                return paiddate;
            };
            model.EmployeePayment = function(txtval) {
                if (txtval !== undefined && txtval !== '' && txtval !== null && txtval !== "undefined") {
                    model.paymentArr = [];
                    model.columns = [];
                    if (model.isManagement === "true" && model.isAdmin === "1") {
                        model.columns.push({ text: '', key: 'ProfileID', type: 'custom', templateUrl: model.paymentProfileID });
                    }
                    model.columns.push({ text: 'Pay Mode', key: 'Type', type: 'label' }, { text: 'Membership', key: 'membershiptype', type: 'label' }, { text: 'Agreed', key: 'AgreedAmount', type: 'label' }, { text: 'Paid', key: 'PaidAmount', type: 'label' }, { text: 'Paid Date', key: 'PaymentDate', type: 'label' }, { text: 'Expiry Date', key: 'ExpiryDate', type: 'label' }, { text: 'Allowed', key: 'Allowed', type: 'label' }, { text: 'Used', key: 'Used', type: 'label' }, { text: 'Entered', key: 'CreatedByEmpID', type: 'label', width: '150px' }, {
                        text: 'Status',
                        key: 'Status',
                        type: 'label'
                    }, { text: 'Authorized by', key: 'StatusBy', type: 'label' }, { text: 'Description', key: 'Description', type: 'label' }, { text: 'Tax', key: 'TaxPaid_Status', type: 'label' });
                    EmployeePaymentservice.getEmployeePayment(txtval).then(
                        function(response) {
                            if (_.isArray(response.data) && response.data.length > 0) {
                                model.CustName = (response.data)[0].CustName;
                                model.ProfileOwner = (response.data)[0].ProfileOwner;
                                model.freshLink = true;
                                model.opendiv = false;
                                model.hidesearch = true;
                                model.hidepaging = true;
                                model.ProfileID = (response.data)[0].ProfileID;
                                model.setData(response.data);
                            } else {
                                state.go('base.EmployeePaymentInsert', { ProfileID: txtval, status: 0, paymentID: 0 });
                            }
                        }
                    );
                } else {
                    alert('please enter profileid');
                }
            };
            model.paymentInsertLink = function(id) {
                state.go('base.EmployeePaymentInsert', { ProfileID: id, status: 1, paymentID: 0 });
            };
            model.viewProfileRedirect = function() {
                window.open('/Viewfullprofile/' + model.ProfileID + "/0", '_blank');
            };
            model.editurl = function(row) {
                var paid = row.Cust_ID !== undefined ? "<a>Edit</a>" : "";
                return paid;
            };
            model.singlegrid.columns = [
                { text: 'Edit', key: 'Cust_ID', type: 'customlink', templateUrl: model.editurl },
                { text: 'Pay Mode', key: 'Type', type: 'label' },
                { text: 'Membership Type', key: 'membership type', type: 'label' },
                { text: 'Agreed Amount', key: 'AgreedAmount', type: 'label' },
                { text: 'Payment Amount', key: 'PaidAmount', type: 'label' },
                { text: 'Payment Date', key: 'PaymentDate', type: 'label' },
                { text: 'Payment Expires', key: 'ExpiryDate', type: 'label' },
                { text: 'Access', key: 'Application name', type: 'label' },
                { text: 'Payment Status', key: 'PaymentStatus', type: 'label' },
                { text: 'Entered by', key: 'CreatedByEmpID', type: 'label' },
                { text: 'Discount Amount', key: 'DiscountAmount', type: 'label' },
                { text: 'Payment Desc', key: 'RemarksToolTip', type: 'label' }
            ];
            model.oldtablepayment = function(profileid) {
                EmployeePaymentservice.getoldpaymentstatus(profileid).then(function(response) {
                    console.log(response.data);
                    model.tablearray = [];
                    if (response.data === 1) {
                        if (model.txtProfileID !== "" && model.txtProfileID !== undefined && model.txtProfileID !== null) {
                            EmployeePaymentservice.getoldpaymentdata(model.txtProfileID, "").then(function(response) {
                                model.gridTableshow = true;
                                console.log(response);
                                _.each(response.data[0], function(item) {
                                    model.tablearray.push(item);
                                });
                                model.singlegrid.sdata = model.tablearray;
                                console.log(model.tablearray);
                                modelpopupopenmethod.showPopupphotopoup('oldtablepayment.html', model.scope, 'lg', "modalclassdashboardphotopopup");

                            });
                        }

                    } else if (response.data === 2) {
                        //STATUS FOR NOREVIEWED
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profileid is not reviewed', 2000);
                        model.txtProfileID = "";
                    } else if (response.data === 3) {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profileid is invalid', 2000);
                        model.txtProfileID = "";
                    } else if (response.data === 10) {
                        //STATUS FOR INACTIVE
                    } else if (response.data === 4) {
                        //STATUS FOR NO PROFILE OWNER
                    } else if (response.data === 5) {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profileid is settled', 2000);
                        model.txtProfileID = "";
                    } else if (response.data === 6) {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profileID is deleted', 2000);
                        model.txtProfileID = "";
                    } else if (response.data === 7) {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profileID is waiting for settled', 2000);
                        model.txtProfileID = "";

                    } else if (response.data === 8) {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profileID is waiting for delete', 2000);
                        model.txtProfileID = "";
                    } else if (response.data === 9) {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profileID is in matchmeeting serious', 2000);
                        model.txtProfileID = "";
                    }

                });
            };
            model.close = function() {
                modelpopupopenmethod.closepopuppoptopopup();
            };
            return model;
        };
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentmodel', factory);
    factory.$inject = ['$http', 'EmployeePaymentservice',
        '$state', 'complex-grid-config', 'authSvc', 'single-grid-config', 'modelpopupopenmethod'
    ];
})(angular);