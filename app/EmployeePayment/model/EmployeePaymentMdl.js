(function() {
    'use strict';

    function factory(http, EmployeePaymentservice, state, config) {

        var model = {};
        model = config;
        model.obj = {};
        model.paymentProfileID = function(row) {
            var status = row.membershiptype === 'Registration' ? 0 : 1;
            var paid = "<a style='cursor:pointer;'  href='/EmployeePaymentInserts/" + row.ProfileID + "/" + status + "/" + row.Payment_ID + "'>" + row.ProfileID + "</a>";
            return paid;
        };
        model.EmployeePayment = function(txtval) {
            if (txtval !== undefined && txtval !== '' && txtval !== null) {
                model.paymentArr = [];

                // _.map(gridArray, function(item) {
                //     model.paymentArr.push({
                //         'paymentProfileID': item.ProfileID,
                //         // 'paymentid': item.Payment_ID,
                //         'Pay Mode': item.Type,
                //         'Membership': item.membershiptype,
                //         'Agreed': item.AgreedAmount,
                //         'Paid': item.PaidAmount,
                //         'Date': item.PaymentDate,
                //         'Expires': item.ExpiryDate,
                //         'Allowed': item.Allowed,
                //         'Used': item.Used,
                //         'Entered': item.CreatedByEmpID,
                //         'Description': item.Description,
                //         'Status': item.Status,
                //         'Authorized by': item.StatusBy
                //     });
                // });

                model.columns = [
                    { text: 'ProfileID', key: 'ProfileID', type: 'custom', templateUrl: model.paymentProfileID },
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

                        if (_.isArray(response.data)) {
                            model.freshLink = true;
                            model.opendiv = false;
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

        return model;
    }

    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentmodel', factory)
    factory.$inject = ['$http', 'EmployeePaymentservice', '$state', 'complex-grid-config'];
})(angular);