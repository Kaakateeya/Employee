angular.module('Kaakateeya').directive("complexSlide", ['$timeout', 'modelpopupopenmethod', 'SelectBindServiceApp',
    function(timeout, modelpopupopenmethod, SelectBindServiceApp) {
        return {
            restrict: "E",
            scope: {
                model: '=',
                config: '='
            },
            templateUrl: "directives/complex-slide/index.html",
            link: function($scope, element, attrs) {
                $scope.myInterval = 0;
                $scope.noWrapSlides = true;
                $scope.activeslide = 0;
                $scope.mainshortlist = false;
                $scope.Viwedslide = 1;
                $scope.playbutton = false;


                $scope.width = "";
                $scope.pauseResume = function(action) {
                    if (action === 'play') {
                        $scope.myInterval = 5000;
                        $scope.playbutton = true;
                    } else {
                        $scope.myInterval = 0;
                        $scope.playbutton = false;
                    }
                };
                $scope.gotoSlide = function(slideIndex) {
                    if (slideIndex !== undefined && slideIndex !== "" && slideIndex !== null && slideIndex !== 0 &&
                        slideIndex !== "0") {
                        $scope.activeslide = parseInt(slideIndex) - 1;
                        slideIndex = 0;
                    }
                };
                $scope.$watch('activeslide', function(news, old) {
                    if (news !== undefined && news !== "" && news !== null) {
                        $scope.Viwedslide = news;
                        $scope.config.slidebind(old, news, $scope.model.slides, $scope.model.typeofPage);
                    }
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
                // $scope.ngclassprogress = function(slidelength, type) {
                //     var classslide = "";
                //     $scope.width = "width:" + slidelength + "%";
                //     if (type == "class") {
                //         classslide = "progress-bar progress-bar-striped progress-bar-danger active";
                //         if (slidelength <= 10) {
                //             classslide = "progress-bar progress-bar-striped progress-bar-danger active";
                //         } else if (slidelength > 10 && slidelength <= 30) {
                //             classslide = "progress-bar progress-bar-striped progress-bar-warning active";
                //         } else if (slidelength > 30 && slidelength <= 50) {
                //             classslide = "progress-bar progress-bar-striped progress-bar-info active";
                //         } else {
                //             classslide = "progress-bar progress-bar-striped progress-bar-success active";
                //         }
                //     }
                //     return classslide;
                // };
            }
        };
    }
]);