angular.module('Kaakateeya').directive("complexSlide", ['$timeout',
    function(timeout) {
        return {
            restrict: "E",
            scope: {
                model: '='
            },
            templateUrl: "directives/complex-slide/index.html",
            link: function($scope, element, attrs) {
                $scope.myInterval = 5000;
                $scope.noWrapSlides = true;
                $scope.active = 0;
                $scope.templateUrl = "templates/angularSlide.html";
                $scope.Viwedslide = 1;
                var currIndex = 0;

                $scope.pauseResume = function(action) {
                    if (action === 'play') {
                        $scope.myInterval = 5000;
                    } else {
                        $scope.myInterval = 0;
                    }
                };
                $scope.gotoSlide = function(slideIndex) {
                    $scope.active = parseInt(slideIndex) - 1;
                };
                $scope.next = function(nextSlide, direction, nextIndex) {
                    console.log(11111);
                };

                $scope.$watch('active', function(news, old) {
                    $scope.Viwedslide = news;
                    $scope.model.slide(old, news);
                });
            }
        };
    }
]);