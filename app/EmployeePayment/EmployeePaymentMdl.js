(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentmodel', ['$http', 'EmployeePaymentservice',
            '$state', 'complex-grid-config', 'authSvc', 'single-grid-config', 'modelpopupopenmethod', 'alert', 'paymentProperty', 'SelectBindService',
            function(http, EmployeePaymentservice, state, config, authSvc, singlegrid, modelpopupopenmethod, alerts, paymentProperty, SelectBindService) {
                var model = {};
                model.singlegrid = {};
                model.singlegrid.showsearchrows = true;
                model.singlegrid.showsearch = true;
                model.singlegrid.showpaging = false;
                model.singlegrid.showClientpaging = false;
                model.singlegrid.myprofileexcel = false;
                model.singlegrid.normalexcel = false;
                model.singlegrid.gridTableshow = false;
                model.showplus = false;
                model.init = function() {
                    model.refreshAdmin();
                    return model;
                };
                model.refreshAdmin = function() {
                    model.Admin = authSvc.isAdmin();
                    model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
                };

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
                    model.refreshAdmin();
                    var status = row.membershiptype === 'Registration' ? 0 : 1;
                    // paymentProperty.setData(row.PaymentHist_ID);
                    var paid = parseInt(model.Admin) === 1 || model.Managementid === 'true' ? "<a style='cursor:pointer;'  href='/EmployeePaymentInserts/" + row.ProfileID + "/" + status + "/" + row.PaymentID + "/" + row.PaymentHist_ID + "'>Edit</a>" : '';
                    return paid;
                };
                model.expirydate = function(row) {
                    var status = row.ExpiryDate !== undefined && row.ExpiryDate !== null && row.ExpiryDate !== "null" ? "/" + row.ExpiryDate : "";
                    var paiddate = "<span>" + row.PaymentDate + status + "</span>";
                    return paiddate;
                };

                model.descriptionTemplate = function(row) {
                    var des = row.Description ? "<a href=javascript:void(0);  ng-click='model.showDescription(" + JSON.stringify(row.Description) + ");'>click me</a>" : '';
                    return des;
                };

                model.showDescription = function(val) {
                    alerts.timeoutoldalerts(model.scope, 'alert-success', val, 10000);
                };

                model.EmployeePayment = function(txtval) {
                    model.data = [];
                    if (model.txtProfileID !== undefined && model.txtProfileID !== '' && model.txtProfileID !== null && model.txtProfileID !== "undefined") {

                        SelectBindService.checkProfileID(model.txtProfileID).then(function(respo) {
                            if (respo.data && parseInt(respo.data) === 1) {
                                model.paymentArr = [];
                                model.columns = [];
                                if (model.isManagement === "true" && model.isAdmin === "1") {
                                    model.columns.push({ text: '', key: 'ProfileID', type: 'custom', templateUrl: model.paymentProfileID });
                                }
                                model.columns.push({ text: 'Pay Mode', key: 'Type', type: 'label' }, { text: 'Membership', key: 'membershiptype', type: 'label' }, { text: 'Agreed', key: 'AgreedAmount', type: 'label' }, { text: 'Paid', key: 'PaidAmount', type: 'label' }, { text: 'Paid Date', key: 'PaymentDate', type: 'label' }, { text: 'Expiry Date', key: 'ExpiryDate', type: 'label' }, { text: 'Allowed', key: 'Allowed', type: 'label' }, { text: 'Used', key: 'Used', type: 'label' }, { text: 'Entered', key: 'CreatedByEmpID', type: 'label', width: '150px' }, {
                                    text: 'Status',
                                    key: 'Status',
                                    type: 'label'
                                }, { text: 'Authorized by', key: 'StatusBy', type: 'label' }, { text: 'Description', key: 'Description', type: 'morelinks', templateUrl: model.descriptionTemplate });
                                EmployeePaymentservice.getEmployeePayment(model.txtProfileID).then(
                                    function(response) {
                                        if (_.isArray(response.data) && response.data.length > 0) {
                                            model.CustName = (response.data)[0].CustName;
                                            model.ProfileOwner = (response.data)[0].ProfileOwner;
                                            model.balancepaymentID = (response.data)[0].PaymentID;
                                            model.balancemembershiptype = (response.data)[0].membershiptype;
                                            model.RenewalStatus = (response.data)[0].RenewalStatus;
                                            model.PaymentHist_ID = (response.data)[0].PaymentHist_ID;
                                            model.freshLink = true;
                                            model.opendiv = false;
                                            model.hidesearch = true;
                                            model.hidepaging = true;
                                            model.ProfileID = (response.data)[0].ProfileID;
                                            model.data = (response.data);
                                        } else {
                                            state.go('base.EmployeePaymentInsert', { ProfileID: model.txtProfileID, status: 0, paymentID: 0, histryid: 0 });
                                        }
                                    }
                                );
                            } else {
                                model.CustName = model.ProfileOwner = '';
                                model.freshLink = false;
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter valid profileID', 10000);
                            }
                        });
                    } else {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter profileid', 10000);
                    }
                };
                model.paymentInsertLink = function(id, type) {
                    if (type === 'renewal')
                        state.go('base.EmployeePaymentInsert', { ProfileID: id, status: 1, paymentID: 0, histryid: model.PaymentHist_ID });
                    else {
                        var Status = model.balancemembershiptype === 'Registration' ? 0 : 1;
                        state.go('base.EmployeePaymentInsert', { ProfileID: id, status: Status, paymentID: model.balancepaymentID, histryid: model.PaymentHist_ID });
                    }

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
                        model.tablearray = [];
                        if (response.data === 1) {
                            if (model.txtProfileID !== "" && model.txtProfileID !== undefined && model.txtProfileID !== null) {
                                EmployeePaymentservice.getoldpaymentdata(model.txtProfileID, "").then(function(response) {
                                    if (_.isArray(response.data) && response.data.length > 0 && (response.data)[0].length > 0) {
                                        model.gridTableshow = true;
                                        _.each(response.data[0], function(item) {
                                            model.tablearray.push(item);
                                        });
                                        model.singlegrid.sdata = model.tablearray;
                                        modelpopupopenmethod.showPopupphotopoup('oldtablepayment.html', model.scope, 'lg', "modalclassdashboardphotopopup");
                                    } else {
                                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'No Data Found', 2000);
                                    }
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
                return model.init();
            }
        ]);
})(angular);