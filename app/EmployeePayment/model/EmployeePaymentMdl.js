(function() {
    'use strict';

    function factory(http, EmployeePaymentservice) {

        var model = {};
        model.obj = {};

        model.EmployeePayment = function(txtval) {
            if (txtval !== undefined && txtval !== '' && txtval !== null) {

                EmployeePaymentservice.getEmployeePayment(txtval).then(
                    function(response) {

                        var gridArray = JSON.parse(response.data);
                        // model.scope.$broadcast('submittable', gridArray);
                        model.paymentArr = [];
                        _.map(gridArray, function(item) {
                            model.paymentArr.push({
                                'paymentProfileID': item.ProfileID,
                                'tableName': item.tableName,
                                'AgreedAmount': item.AgreedAmount,
                                'PaidAmount': item.PaidAmount,
                                'Type': item.Type,
                                'membershiptype': item.membershiptype,
                                'Payment_ID': item.Payment_ID,
                                'PaymentDate': item.PaymentDate,
                                'ExpiryDate': item.ExpiryDate,
                                'CreatedByEmpID': item.CreatedByEmpID,
                                'Applicationname': item.Applicationname
                            });
                        });
                        model.scope.$broadcast('submittable', model.paymentArr);
                    }
                );
            } else {
                alert('please enter profileid');

            }
        };

        return model;
    }

    angular
        .module('Kaakateeya')
        .factory('EmployeePaymentmodel', factory)
    factory.$inject = ['$http', 'EmployeePaymentservice'];
})(angular);