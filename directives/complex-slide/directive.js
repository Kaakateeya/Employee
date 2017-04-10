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
                $scope.noWrapSlides = false;
                $scope.active = 0;
                // var slides = scope.slides = [];
                // slides = scope.slides = scope.model.slides;
                // var slides = $scope.slides = [];

                var currIndex = 0;

                // $scope.addSlide = function() {
                //     var newWidth = 600 + slides.length + 1;
                //     slides.push({
                //         image: '//unsplash.it/' + newWidth + '/300',
                //         text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                //         id: currIndex++
                //     });
                // };

                // $scope.randomize = function() {
                //     var indexes = generateIndexesArray();
                //     assignNewIndexesToSlides(indexes);
                // };

                // for (var i = 0; i < 4; i++) {
                //     $scope.addSlide();
                // }

                // Randomize logic below

                // function assignNewIndexesToSlides(indexes) {
                //     for (var i = 0, l = slides.length; i < l; i++) {
                //         slides[i].id = indexes.pop();
                //     }
                // }

                // function generateIndexesArray() {
                //     var indexes = [];
                //     for (var i = 0; i < currIndex; ++i) {
                //         indexes[i] = i;
                //     }
                //     return shuffle(indexes);
                // }

                // function shuffle(array) {
                //     var tmp, current, top = array.length;

                //     if (top) {
                //         while (--top) {
                //             current = Math.floor(Math.random() * (top + 1));
                //             tmp = array[current];
                //             array[current] = array[top];
                //             array[top] = tmp;
                //         }
                //     }

                //     return array;
                // }
            }
        };
    }
]);