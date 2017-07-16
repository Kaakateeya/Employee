(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('allowAdminManagement', directive);

    directive.$inject = ['authSvc'];

    function directive(authSvc) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
            scope.Admin = authSvc.isAdmin();

            if (scope.Managementid === 'true' || scope.Admin === '1') {
                element.css('display', 'block');
            } else {
                element.css('display', 'none');
            }

        }
    }

})();