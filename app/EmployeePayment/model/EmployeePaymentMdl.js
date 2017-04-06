(function() {
    'use strict';

    function factory(http, EmployeePaymentservice, state, config) {

        var model = {};
        model = config;
        model.obj = {};
        model.CustName = '';
        model.ProfileOwner = '';
        model.ProfileID = '';



        model.paymentProfileID = function(row) {
            var status = row.membershiptype === 'Registration' ? 0 : 1;
            var paid = "<a style='cursor:pointer;'  href='/EmployeePaymentInserts/" + row.ProfileID + "/" + status + "/" + row.PaymentID + "'>Edit</a>";
            return paid;
        };
        model.EmployeePayment = function(txtval) {
            if (txtval !== undefined && txtval !== '' && txtval !== null && txtval !== "undefined") {
                model.paymentArr = [];
                model.columns = [
                    { text: '', key: 'ProfileID', type: 'custom', templateUrl: model.paymentProfileID },
                    { text: 'Pay Mode', key: 'Type', type: 'label' },
                    { text: 'Membership', key: 'membershiptype', type: 'label' },
                    { text: 'Agreed', key: 'AgreedAmount', type: 'label' },
                    { text: 'Paid', key: 'PaidAmount', type: 'label' },
                    { text: 'Date', key: 'PaymentDate', type: 'label' },
                    { text: 'Expires', key: 'ExpiryDate', type: 'label' },
                    { text: 'Allowed', key: 'Allowed', type: 'label' },
                    { text: 'Used', key: 'Used', type: 'label' },
                    { text: 'Entered', key: 'CreatedByEmpID', type: 'label', width: '150px' },
                    { text: 'Description', key: 'Description', type: 'label' },
                    { text: 'Status', key: 'Status', type: 'label' },
                    { text: 'Authorized by', key: 'StatusBy', type: 'label' }
                ];

                EmployeePaymentservice.getEmployeePayment(txtval).then(
                    function(response) {
                        // var gridArray = JSON.parse(response.data);
                        console.log(response.data);
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
            state.go('employeeViewfullprofile', { ProfileID: model.ProfileID });
        };
        return model;
    }

    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentmodel', factory);
    factory.$inject = ['$http', 'EmployeePaymentservice', '$state', 'complex-grid-config'];
})(angular);