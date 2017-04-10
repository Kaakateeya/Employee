angular.module('Kaakateeya').directive("complexSlide", ['$timeout', 'modelpopupopenmethod', 'SelectBindServiceApp',
    function(timeout, modelpopupopenmethod, SelectBindServiceApp) {
        return {
            restrict: "E",
            scope: {
                model: '=',
                slides: '=',
                innerslide: "="
            },
            templateUrl: "directives/complex-slide/index.html",
            link: function($scope, element, attrs) {
                $scope.slideshow = $scope.slides;
                $scope.innerslide = 0;
                $scope.myInterval = 5000;
                $scope.myIntervalinner = 5000;
                $scope.noWrapSlides = true;
                $scope.activeslide = 0;
                $scope.inneractive = 0;
                $scope.innerslideshort = true;
                $scope.mainshortlist = false;
                $scope.templateUrl = "templates/angularSlide.html";
                $scope.Viwedslide = 1;
                var currIndex = 0;
                $scope.headettemp = "templates/angularHeader.html";
                $scope.pauseResume = function(action, myInterval) {
                    if (action === 'play') {
                        myInterval = 5000;
                    } else {
                        myInterval = 0;
                    }
                };
                $scope.gotoSlide = function(slideIndex) {
                    $scope.activeslide = parseInt(slideIndex) - 1;
                };
                $scope.next = function(nextSlide, direction, nextIndex) {
                    console.log(11111);
                };
                $scope.$watch('activeslide', function(news, old) {
                    $scope.Viwedslide = news;
                    $scope.model.slidebind(old, news, $scope.model.slides);
                });
                $scope.slidepopup = function(custid) {
                    SelectBindServiceApp.getphotoslideimages(custid).then(function(response) {
                        $scope.slidephotos = [];
                        $scope.popupmodalbody = false;
                        _.each(response.data, function(item) {
                            $scope.slidephotos.push(item);
                        });
                        modelpopupopenmethod.showPopupphotopoup('dynamicphotopopup.html', $scope, '', "modalclassdashboardphotopopup");
                    });
                };
                $scope.horoscopeimage = function(image) {
                    $scope.HoroscopeImage = image;
                    $scope.popupmodalbody = true;
                    modelpopupopenmethod.showPopupphotopoup('dynamicphotopopup.html', $scope, '', "modalclassdashboardphotopopup");
                };
                // $scope.$on("slidebind", function(event, array) {
                //     $scope.innerslide = 0;
                //     $scope.slideshow = array;
                // });
                $scope.$on("slidebindinner", function(event, array) {
                    $scope.innerslideshort = false;
                    $scope.mainshortlist = true;
                    modelpopupopenmethod.showPopupphotopoup('mainShortListProfiles.html', $scope, 'lg', "modalclassdashboardphotopopup");
                });
            }
        };
    }
]);