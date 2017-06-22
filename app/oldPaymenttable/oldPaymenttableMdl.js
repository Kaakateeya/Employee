(function() {
    'use strict';



    function factory(oldPaymenttableService, configgrid, alerts, modelpopupopenmethod) {
        var model = {};
        model = configgrid;
        model.showsearchrows = true;
        model.showsearch = true;
        model.showpaging = false;
        model.showClientpaging = false;
        model.myprofileexcel = false;
        model.normalexcel = false;
        model.gridTableshow = false;
        model.receivedprofiles = 1;
        model.sentprofile = 1;
        model.showplus = false;
        model.editurl = function(row) {
            var paid = row.Cust_ID !== undefined ? "<a>Edit</a>" : "";
            return paid;
        };
        // model.ViewProfile = function(row) {
        //     window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
        // };
        model.columns = [
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
        model.oldtabledata = function(profileid) {
            oldPaymenttableService.getoldpaymentstatus(profileid).then(function(response) {
                model.tablearray = [];
                if (response.data === 1) {
                    if (model.txtProfileID !== "" && model.txtProfileID !== undefined && model.txtProfileID !== null) {
                        oldPaymenttableService.getoldpaymentdata(model.txtProfileID, "").then(function(response) {
                            model.gridTableshow = true;
                            _.each(response.data[0], function(item) {
                                model.tablearray.push(item);
                            });
                            // model.setDatagrid(model.tablearray);
                            model.sdata = model.tablearray;
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
        return model;

    }
    angular
        .module('Kaakateeya')
        .factory('oldPaymenttableModel', factory);

    factory.$inject = ['oldPaymenttableService', 'single-grid-config', 'alert', 'modelpopupopenmethod'];
})();