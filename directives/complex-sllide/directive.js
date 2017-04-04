angular.module('Kaakateeya').directive("complexSlide", ['modelpopupopenmethod', '$timeout', 'SelectBindServiceApp',
    function(commonpage, timeout, SelectBindServiceApp) {
        return {
            restrict: "E",
            scope: {

            },
            templateUrl: "directives/complex-slide/index.html",
            link: function(scope, element, attrs) {}
        };
    }
]);
angular.module('Kaakateeya').filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});