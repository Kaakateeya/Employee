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
app.directive('focusd', function($timeout) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            scope.$on('inputFocus', function(e, name) {
                if (attrs.name === name) {
                    elem.focus();
                }
            });
        }
    }
});