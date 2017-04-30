(function() {
    'use strict';

    function factory(http, EmployeePaymentservice, state, config, authSvc) {
        var model = {};
        model = config;
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
                        // var gridArray = JSON.parse(response.data);
                        if (_.isArray(response.data) && response.data.length > 0) {
                            model.CustName = (response.data)[0].CustName;
                            model.ProfileOwner = (response.data)[0].ProfileOwner;
                            model.freshLink = true;
                            model.opendiv = false;
                            model.hidesearch = true;
                            model.hidepaging = true;
                            model.ProfileID = (response.data)[0].ProfileID;
                            model.setData(response.data);
                            console.log(response.data);
                        } else {
                            state.go('EmployeePaymentInsert', { ProfileID: txtval, status: 0, paymentID: 0 });
                        }
                    }
                );
            } else {
                alert('please enter profileid');
            }
        };
        model.paymentInsertLink = function(id) {
            state.go('EmployeePaymentInsert', { ProfileID: id, status: 1, paymentID: 0 });
        };
        model.viewProfileRedirect = function() {
            window.open('/Viewfullprofile/' + model.ProfileID, '_blank');
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentmodel', factory);
    factory.$inject = ['$http', 'EmployeePaymentservice', '$state', 'complex-grid-config', 'authSvc'];
})(angular);