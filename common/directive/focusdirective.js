// app.directive('rfocus', function() {
//     return {
//         restrict: 'A',
//         controller: function($scope, $element, $attrs) {
//             var fooName = 'setFocus' + $attrs.rfocus;
//             $scope[fooName] = function() {
//                 $element.focus();
//             }
//         },
//     }
// });
app.directive('ngFocuss', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.ngFocus, function(val) {
                if (angular.isDefined(val) && val) {
                    $timeout(function() { element[0].focus(); });
                }
            }, true);

            element.bind('blur', function() {
                if (angular.isDefined(attrs.ngFocusLost)) {
                    scope.$apply(attrs.ngFocusLost);

                }
            });
        }
    };
});