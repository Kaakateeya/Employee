(function() {
    'use strict';

    function factory(http, EmployeePaymentservice, state) {

        var model = {};
        model.obj = {};

        model.EmployeePayment = function(txtval) {
            if (txtval !== undefined && txtval !== '' && txtval !== null) {
                model.paymentArr = [];
                EmployeePaymentservice.getEmployeePayment(txtval).then(
                    function(response) {

                        var gridArray = JSON.parse(response.data);
                        console.log(gridArray);
                        // model.scope.$broadcast('submittable', gridArray);


                        if (gridArray.length > 0) {
                            model.freshLink = false;
                            _.map(gridArray, function(item) {
                                model.paymentArr.push({
                                    'paymentProfileID': item.ProfileID,
                                    'Pay Mode': item.Type,
                                    'Membership': item.membershiptype,
                                    'Agreed': item.AgreedAmount,
                                    'Paid': item.PaidAmount,
                                    'Date': item.PaymentDate,
                                    'Expires': item.ExpiryDate,
                                    'Allowed': item.Allowed,
                                    'Used': item.Used,
                                    'Entered': item.CreatedByEmpID,
                                    'Description': item.Description,
                                    'Status': item.Status,
                                    'Authorized by': item.StatusBy
                                });
                            });
                            model.scope.$broadcast('submittable', model.paymentArr);
                        } else {
                            model.freshLink = true;
                        }
                    }
                );
            } else {
                alert('please enter profileid');

            }
        };
        model.paymentInsertLink = function(id) {

            state.go('EmployeePaymentInsert', { ProfileID: id });
        };
        return model;
    }

    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentmodel', factory)
    factory.$inject = ['$http', 'EmployeePaymentservice', '$state'];
})(angular);