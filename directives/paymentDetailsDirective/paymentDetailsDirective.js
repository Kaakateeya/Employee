(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('paymentDetails', directive);

    directive.$inject = ['EmployeePaymentmodel', 'authSvc', 'modelpopupopenmethod'];

    function directive(EmployeePaymentmodel, authSvc, modelpopupopenmethod) {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                profileId: '='
            },
            templateUrl: 'directives/paymentDetailsDirective/index.html'
        };
        return directive;

        function link(scope, element, attrs) {

            scope.model = EmployeePaymentmodel;
            scope.model.scope = scope;
            scope.model.data = [];
            scope.model.txtProfileID = "";
            scope.model.freshLink = false;
            scope.model.CustName = '';
            scope.model.ProfileOwner = '';
            scope.model.ProfileID = '';

            scope.model.isManagement = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
            scope.model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
            scope.model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";

            if (scope.profileId) {
                scope.model.txtProfileID = scope.profileId;
                scope.model.EmployeePayment(scope.model.txtProfileID);
            }

            scope.close = function() {
                modelpopupopenmethod.thirdClosepopup();
            };

        }
    }

})();