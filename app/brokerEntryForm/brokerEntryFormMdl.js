(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('brokerEntryFormModel', factory);

    factory.$inject = ['brokerEntryFormService', 'alert', 'SelectBindServicereg'];

    function factory(brokerEntryFormService, alertss, SelectBindServicereg) {

        var model = {};
        model.scope = {};
        model.emailpattaren = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i;
        model.submitBrokerForm = function() {
            var inobj = {
                name: model.Name,
                place: model.Native,
                email: model.Email,
                mobileNumber: model.Number,
                whatsappNumber: model.WatsappNumber,
                brokerId: null,
                flag: 1,
                BranchID: model.branchId
            };

            brokerEntryFormService.submitEntryForm(inobj).then(function(response) {
                model.reset();
                model.scope.brokerForm.$setPristine();
                if (response.data && parseInt(response.data) === 1) {
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Inserted successfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Insertion failed', 4500);
                }
            });
        };

        model.reset = function() {
            model.Name = '';
            model.Native = '';
            model.Email = '';
            model.Number = '';
            model.WatsappNumber = '';
            model.branchId = '';
        };

        model.valueExists = function(type, flag, val) {
            if (val !== undefined) {
                brokerEntryFormService.emailExists({ iflagEmailmobile: flag, EmailMobile: val }).then(function(response) {
                    if (response.data === 1) {
                        if (type === 'email') {

                            model.Email = '';
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Email Already Exists', 9500);
                        } else if (type === 'watsapp') {
                            model.WatsappNumber = '';
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Mobile number Already Exists', 9500);
                        } else {
                            model.Number = '';
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Mobile number Already Exists', 9500);
                        }
                    }
                });
            }
        };

        return model;

    }
})();