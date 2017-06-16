(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('customDatepicker', directive);

    function directive() {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                ngModel: '=',
                dateOptions: "=",
                placeholder: "=",
                id: "=",
                ngClass: "="
            },
            template: '<input id="{{id}}" ng-class="ngClass"  placeholder="{{placeholder}}" type="text" ui-date-format="MM/dd/yyyy" class="datepicker3 form-control" ng-model="ngModel" ui-date="dateOptions"/>'
        };
        return directive;

        function link(scope, element, attrs) {
            // scope.$watch("ngModel", function(newvalue, old) {
            //     console.log(old);
            //     console.log(newvalue);
            //     scope.ngModel = newvalue;
            // });
        }
    }

})();